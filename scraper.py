#!/usr/bin/env python3
"""
Comprehensive Web Scraper for sankaraeye.com
Scrapes all pages, posts, press releases, testimonials, events, products,
extracts structured content, metadata, clean markdown, raw HTML,
and downloads all high-resolution images, documents (PDFs), CSS, and JS assets.
"""

import os
import sys
import re
import json
import time
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup, Comment

# Base configuration
BASE_URL = "https://sankaraeye.com"
DOMAIN = "sankaraeye.com"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scraped_data")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://sankaraeye.com/",
}

# Directories setup
DIRS = {
    "root": OUTPUT_DIR,
    "raw_html": os.path.join(OUTPUT_DIR, "raw_html"),
    "markdown": os.path.join(OUTPUT_DIR, "content_markdown"),
    "json": os.path.join(OUTPUT_DIR, "content_json"),
    "images": os.path.join(OUTPUT_DIR, "assets", "images"),
    "documents": os.path.join(OUTPUT_DIR, "assets", "documents"),
    "css": os.path.join(OUTPUT_DIR, "assets", "css"),
    "js": os.path.join(OUTPUT_DIR, "assets", "js"),
    "mirror": os.path.join(OUTPUT_DIR, "site_mirror"),
}

for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

session = requests.Session()
session.headers.update(HEADERS)

def safe_filename(name, default="index", max_len=120):
    name = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', name)
    name = re.sub(r'_+', '_', name).strip('_')
    if not name:
        name = default
    if len(name) > max_len:
        name = name[:max_len]
    return name

def get_slug_from_url(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "home"
    parts = path.split("/")
    return "-".join(parts)

def classify_url(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "home", "pages"
    
    parts = path.split("/")
    first_segment = parts[0].lower()
    
    if first_segment in ["press", "press-release", "press-releases", "news"]:
        return parts[-1], "press"
    elif first_segment in ["testimonials", "testimonial", "patient-stories"]:
        return parts[-1], "testimonials"
    elif first_segment in ["events", "tribe_events", "event"]:
        return parts[-1], "events"
    elif first_segment in ["product", "products", "shop"]:
        return parts[-1], "products"
    elif first_segment in ["blog", "posts", "category", "tag", "author"]:
        return parts[-1], "posts"
    elif first_segment in ["doctors", "our-doctors", "doctor"]:
        return parts[-1], "doctors"
    elif first_segment in ["locations", "hospitals", "branches"]:
        return parts[-1], "locations"
    elif first_segment in ["specialities", "speciality", "departments"]:
        return parts[-1], "specialities"
    else:
        # Check if single post or page
        if len(parts) == 1:
            return parts[0], "pages"
        else:
            return parts[-1], parts[0]

def discover_sitemap_urls():
    sitemap_indexes = [
        f"{BASE_URL}/sitemap_index.xml",
        f"{BASE_URL}/sitemap.xml",
        f"{BASE_URL}/wp-sitemap.xml"
    ]
    
    discovered_sitemaps = set()
    all_page_urls = set()
    
    for sm_index in sitemap_indexes:
        try:
            print(f"[*] Checking sitemap index: {sm_index}")
            r = session.get(sm_index, timeout=15)
            if r.status_code == 200:
                root = ET.fromstring(r.content)
                ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                # Check for sitemapindex
                sub_sms = [elem.text.strip() for elem in root.findall('.//ns:loc', ns) if elem.text]
                for sub in sub_sms:
                    if sub.endswith('.xml'):
                        discovered_sitemaps.add(sub)
                    else:
                        all_page_urls.add(sub)
        except Exception as e:
            print(f"[-] Sitemap index error ({sm_index}): {e}")

    # Fallback/known sitemaps if not found
    known_sitemaps = [
        f"{BASE_URL}/post-sitemap.xml",
        f"{BASE_URL}/page-sitemap.xml",
        f"{BASE_URL}/product-sitemap.xml",
        f"{BASE_URL}/tribe_events-sitemap.xml",
        f"{BASE_URL}/press-sitemap.xml",
        f"{BASE_URL}/testimonials-sitemap.xml",
        f"{BASE_URL}/category-sitemap.xml",
        f"{BASE_URL}/post_tag-sitemap.xml",
    ]
    discovered_sitemaps.update(known_sitemaps)

    for sm in list(discovered_sitemaps):
        try:
            print(f"[*] Fetching sitemap: {sm}")
            r = session.get(sm, timeout=15)
            if r.status_code == 200:
                root = ET.fromstring(r.content)
                ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                urls = [elem.text.strip() for elem in root.findall('.//ns:loc', ns) if elem.text]
                for u in urls:
                    if not u.endswith('.xml'):
                        all_page_urls.add(u)
                print(f"[+] Found {len(urls)} URLs in {sm}")
        except Exception as e:
            pass

    return all_page_urls

def crawl_and_discover_urls(initial_urls, max_crawl=300):
    visited = set()
    to_visit = set(initial_urls)
    to_visit.add(f"{BASE_URL}/")
    all_discovered = set()

    print(f"[*] Starting crawl with {len(to_visit)} initial URLs...")

    while to_visit and len(visited) < max_crawl:
        url = to_visit.pop()
        # Clean URL
        parsed = urllib.parse.urlparse(url)
        clean_url = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', '', ''))
        clean_url = clean_url.rstrip("/") if clean_url != BASE_URL else BASE_URL
        if not clean_url:
            clean_url = f"{BASE_URL}/"

        if clean_url in visited:
            continue
        visited.add(clean_url)
        all_discovered.add(clean_url)

        # We only crawl HTML pages
        if any(clean_url.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.pdf', '.css', '.js', '.zip', '.mp4']):
            continue

        try:
            r = session.get(clean_url, timeout=15)
            if r.status_code == 200 and 'text/html' in r.headers.get('Content-Type', ''):
                soup = BeautifulSoup(r.content, 'html.parser')
                for a in soup.find_all('a', href=True):
                    href = a['href'].strip()
                    if href.startswith('#') or href.startswith('mailto:') or href.startswith('tel:') or href.startswith('javascript:'):
                        continue
                    full_url = urllib.parse.urljoin(clean_url, href)
                    p = urllib.parse.urlparse(full_url)
                    if p.netloc == DOMAIN or p.netloc == f"www.{DOMAIN}":
                        clean_found = urllib.parse.urlunparse((p.scheme, p.netloc, p.path, '', '', ''))
                        clean_found = clean_found.rstrip("/") if clean_found != BASE_URL else BASE_URL
                        if clean_found not in visited and clean_found not in to_visit:
                            # Filter wp-admin, wp-login, etc.
                            if '/wp-admin' not in clean_found and '/wp-login' not in clean_found and '/wp-json' not in clean_found and '/feed' not in clean_found:
                                to_visit.add(clean_found)
        except Exception as e:
            print(f"[-] Crawl error on {clean_url}: {e}")

    print(f"[+] Crawl complete. Total pages discovered: {len(all_discovered)}")
    return all_discovered

def html_to_clean_markdown(soup, title, url):
    """Converts page soup to high quality clean Markdown."""
    lines = []
    lines.append(f"# {title}\n")
    lines.append(f"**Source URL**: [{url}]({url})\n")
    lines.append(f"---\n")

    # Clone soup to avoid mutating original
    body = soup.find('body')
    if not body:
        return f"# {title}\n\nSource: {url}\n"

    # Remove unwanted noise
    for tag in body.find_all(['script', 'style', 'noscript', 'iframe', 'svg', 'header', 'footer', 'nav']):
        tag.decompose()
    
    # Try finding main content area
    main = (
        body.find('main') or 
        body.find('article') or 
        body.find('div', class_=re.compile(r'content|main|page-content|entry-content|post-content', re.I)) or 
        body
    )

    # Process elements recursively into readable text
    for elem in main.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'table', 'blockquote', 'img']):
        if elem.name == 'h1':
            lines.append(f"\n# {elem.get_text(strip=True)}\n")
        elif elem.name == 'h2':
            lines.append(f"\n## {elem.get_text(strip=True)}\n")
        elif elem.name == 'h3':
            lines.append(f"\n### {elem.get_text(strip=True)}\n")
        elif elem.name == 'h4':
            lines.append(f"\n#### {elem.get_text(strip=True)}\n")
        elif elem.name == 'h5' or elem.name == 'h6':
            lines.append(f"\n##### {elem.get_text(strip=True)}\n")
        elif elem.name == 'p':
            txt = elem.get_text(strip=True)
            if txt:
                lines.append(f"{txt}\n")
        elif elem.name == 'blockquote':
            txt = elem.get_text(strip=True)
            if txt:
                lines.append(f"> {txt}\n")
        elif elem.name == 'ul':
            for li in elem.find_all('li', recursive=False):
                txt = li.get_text(strip=True)
                if txt:
                    lines.append(f"* {txt}")
            lines.append("")
        elif elem.name == 'ol':
            for idx, li in enumerate(elem.find_all('li', recursive=False), 1):
                txt = li.get_text(strip=True)
                if txt:
                    lines.append(f"{idx}. {txt}")
            lines.append("")
        elif elem.name == 'img':
            src = elem.get('src') or elem.get('data-src') or elem.get('data-lazy-src')
            alt = elem.get('alt', 'Image')
            if src and not src.startswith('data:'):
                lines.append(f"![{alt}]({src})\n")
        elif elem.name == 'table':
            rows = elem.find_all('tr')
            if rows:
                lines.append("")
                for row_idx, r in enumerate(rows):
                    cells = [c.get_text(strip=True) for c in r.find_all(['th', 'td'])]
                    if cells:
                        lines.append("| " + " | ".join(cells) + " |")
                        if row_idx == 0:
                            lines.append("| " + " | ".join(["---"] * len(cells)) + " |")
                lines.append("")

    return "\n".join(lines)

def extract_page_data(url, html_bytes):
    soup = BeautifulSoup(html_bytes, 'html.parser')
    
    # Metadata extraction
    title_tag = soup.find('title')
    title = title_tag.get_text(strip=True) if title_tag else get_slug_from_url(url)
    
    meta_desc = ""
    meta_keywords = ""
    og_data = {}
    twitter_data = {}
    schema_ld = []

    for meta in soup.find_all('meta'):
        name = meta.get('name', '').lower()
        prop = meta.get('property', '').lower()
        content = meta.get('content', '')
        
        if name == 'description':
            meta_desc = content
        elif name == 'keywords':
            meta_keywords = content
        elif prop.startswith('og:'):
            og_data[prop[3:]] = content
        elif name.startswith('twitter:'):
            twitter_data[name[8:]] = content

    # Schema JSON-LD
    for s_tag in soup.find_all('script', type='application/ld+json'):
        try:
            if s_tag.string:
                schema_ld.append(json.loads(s_tag.string))
        except Exception:
            pass

    # Headings
    headings = {
        'h1': [h.get_text(strip=True) for h in soup.find_all('h1') if h.get_text(strip=True)],
        'h2': [h.get_text(strip=True) for h in soup.find_all('h2') if h.get_text(strip=True)],
        'h3': [h.get_text(strip=True) for h in soup.find_all('h3') if h.get_text(strip=True)],
        'h4': [h.get_text(strip=True) for h in soup.find_all('h4') if h.get_text(strip=True)],
    }

    # Links
    internal_links = set()
    external_links = set()
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        full_href = urllib.parse.urljoin(url, href)
        p = urllib.parse.urlparse(full_href)
        if p.netloc in [DOMAIN, f"www.{DOMAIN}"]:
            internal_links.add(full_href)
        elif p.scheme in ['http', 'https']:
            external_links.add(full_href)

    # Images
    page_images = set()
    for img in soup.find_all('img'):
        for attr in ['src', 'data-src', 'data-lazy-src', 'data-original', 'srcset', 'data-srcset']:
            val = img.get(attr)
            if val:
                if 'srcset' in attr:
                    parts = [p.strip().split(' ')[0] for p in val.split(',') if p.strip()]
                    for p_url in parts:
                        full_img_url = urllib.parse.urljoin(url, p_url)
                        if not full_img_url.startswith('data:'):
                            page_images.add(full_img_url)
                elif not val.startswith('data:'):
                    page_images.add(urllib.parse.urljoin(url, val))

    # Background images
    for tag in soup.find_all(style=True):
        bg_matches = re.findall(r'url\([\'\"]?(.*?)[\'\"]?\)', tag['style'])
        for bg in bg_matches:
            if not bg.startswith('data:'):
                page_images.add(urllib.parse.urljoin(url, bg))

    # Documents (PDFs, docs, zips)
    documents = set()
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        full_doc = urllib.parse.urljoin(url, href)
        if any(full_doc.lower().endswith(ext) for ext in ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar', '.ppt', '.pptx', '.csv']):
            documents.add(full_doc)

    # CSS & JS
    css_files = set()
    for link in soup.find_all('link', rel=lambda r: r and 'stylesheet' in r):
        href = link.get('href')
        if href:
            css_files.add(urllib.parse.urljoin(url, href))

    js_files = set()
    for s_tag in soup.find_all('script', src=True):
        src = s_tag.get('src')
        if src:
            js_files.add(urllib.parse.urljoin(url, src))

    # Clean text content
    clean_text = soup.get_text(separator=' ', strip=True)

    # Clean Markdown
    markdown_content = html_to_clean_markdown(soup, title, url)

    slug, category = classify_url(url)

    data = {
        "url": url,
        "slug": slug,
        "category": category,
        "title": title,
        "meta_description": meta_desc,
        "meta_keywords": meta_keywords,
        "og": og_data,
        "twitter": twitter_data,
        "schema_ld": schema_ld,
        "headings": headings,
        "internal_links": sorted(list(internal_links)),
        "external_links": sorted(list(external_links)),
        "images": sorted(list(page_images)),
        "documents": sorted(list(documents)),
        "css_files": sorted(list(css_files)),
        "js_files": sorted(list(js_files)),
        "clean_text_length": len(clean_text),
        "clean_text": clean_text[:2000] + "..." if len(clean_text) > 2000 else clean_text,
    }

    return data, markdown_content, page_images, documents, css_files, js_files

def download_asset(asset_url, target_dir, referer=BASE_URL):
    try:
        parsed = urllib.parse.urlparse(asset_url)
        path = parsed.path.strip("/")
        if not path:
            return None
        
        filename = os.path.basename(path)
        if not filename or '.' not in filename:
            filename = safe_filename(path) + ".asset"
        else:
            filename = safe_filename(os.path.splitext(filename)[0]) + os.path.splitext(filename)[1].split('?')[0]
        
        # Avoid collisions using hash of url if necessary
        target_path = os.path.join(target_dir, filename)
        if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
            return target_path

        r = session.get(asset_url, headers={"Referer": referer}, timeout=20)
        if r.status_code == 200 and len(r.content) > 0:
            with open(target_path, "wb") as f:
                f.write(r.content)
            return target_path
    except Exception as e:
        pass
    return None

def main():
    print("=" * 60)
    print("SANKARA EYE HOSPITAL - FULL WEBSITE SCRAPER & ARCHIVER")
    print("=" * 60)
    start_time = time.time()

    # 1. Discover all URLs
    sitemap_urls = discover_sitemap_urls()
    print(f"[+] Sitemaps provided {len(sitemap_urls)} URLs.")
    
    all_urls = crawl_and_discover_urls(sitemap_urls, max_crawl=500)
    print(f"\n[+] Total target pages to scrape: {len(all_urls)}")

    all_page_records = []
    all_images_to_download = set()
    all_docs_to_download = set()
    all_css_to_download = set()
    all_js_to_download = set()

    # Category buckets
    category_buckets = {
        "pages": [],
        "posts": [],
        "press": [],
        "testimonials": [],
        "events": [],
        "products": [],
        "doctors": [],
        "locations": [],
        "specialities": [],
        "other": []
    }

    # 2. Fetch and scrape every page
    print("\n[*] Processing and scraping pages...")
    
    def process_single_page(url):
        try:
            r = session.get(url, timeout=20)
            if r.status_code == 200 and 'text/html' in r.headers.get('Content-Type', ''):
                data, md, imgs, docs, css, js = extract_page_data(url, r.content)
                slug = data['slug']
                category = data['category']
                
                # Raw HTML saving
                cat_raw_dir = os.path.join(DIRS["raw_html"], category)
                os.makedirs(cat_raw_dir, exist_ok=True)
                raw_path = os.path.join(cat_raw_dir, f"{safe_filename(slug)}.html")
                with open(raw_path, "wb") as f:
                    f.write(r.content)

                # Markdown saving
                cat_md_dir = os.path.join(DIRS["markdown"], category)
                os.makedirs(cat_md_dir, exist_ok=True)
                md_path = os.path.join(cat_md_dir, f"{safe_filename(slug)}.md")
                with open(md_path, "w", encoding="utf-8") as f:
                    f.write(md)

                # JSON saving
                cat_json_dir = os.path.join(DIRS["json"], category)
                os.makedirs(cat_json_dir, exist_ok=True)
                json_path = os.path.join(cat_json_dir, f"{safe_filename(slug)}.json")
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

                return {
                    "success": True,
                    "url": url,
                    "data": data,
                    "imgs": imgs,
                    "docs": docs,
                    "css": css,
                    "js": js,
                }
            else:
                return {"success": False, "url": url, "error": f"Status {r.status_code}"}
        except Exception as e:
            return {"success": False, "url": url, "error": str(e)}

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(process_single_page, url): url for url in all_urls}
        completed_count = 0
        for f in as_completed(futures):
            completed_count += 1
            res = f.result()
            if res["success"]:
                d = res["data"]
                all_page_records.append(d)
                cat = d["category"]
                if cat in category_buckets:
                    category_buckets[cat].append(d)
                else:
                    category_buckets["other"].append(d)

                all_images_to_download.update(res["imgs"])
                all_docs_to_download.update(res["docs"])
                all_css_to_download.update(res["css"])
                all_js_to_download.update(res["js"])

                if completed_count % 10 == 0 or completed_count == len(all_urls):
                    print(f"[{completed_count}/{len(all_urls)}] Scraped: {d['title'][:40]} ({d['url']})")
            else:
                print(f"[-] Failed ({completed_count}/{len(all_urls)}): {res['url']} - {res.get('error')}")

    print(f"\n[+] Successfully scraped {len(all_page_records)} pages.")
    print(f"[+] Total unique images found: {len(all_images_to_download)}")
    print(f"[+] Total unique documents/PDFs found: {len(all_docs_to_download)}")
    print(f"[+] Total CSS files found: {len(all_css_to_download)}")
    print(f"[+] Total JS files found: {len(all_js_to_download)}")

    # 3. Download all Images concurrently
    print("\n[*] Downloading all images...")
    valid_images = [img for img in all_images_to_download if not img.startswith('data:') and not 'facebook.com/tr' in img and not 'google-analytics' in img]
    downloaded_images = 0
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(download_asset, img_url, DIRS["images"]): img_url for img_url in valid_images}
        for f in as_completed(futures):
            if f.result():
                downloaded_images += 1
                if downloaded_images % 25 == 0:
                    print(f"[+] Downloaded {downloaded_images}/{len(valid_images)} images...")
    print(f"[+] Downloaded {downloaded_images} images to {DIRS['images']}")

    # 4. Download all Documents (PDFs)
    print("\n[*] Downloading all documents & PDFs...")
    downloaded_docs = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_asset, doc_url, DIRS["documents"]): doc_url for doc_url in all_docs_to_download}
        for f in as_completed(futures):
            if f.result():
                downloaded_docs += 1
    print(f"[+] Downloaded {downloaded_docs} documents to {DIRS['documents']}")

    # 5. Download CSS & JS Assets
    print("\n[*] Downloading core CSS & JS assets...")
    for css_url in all_css_to_download:
        if DOMAIN in css_url or 'fonts' in css_url or 'wp-content' in css_url:
            download_asset(css_url, DIRS["css"])
    for js_url in all_js_to_download:
        if DOMAIN in js_url or 'wp-content' in js_url:
            download_asset(js_url, DIRS["js"])

    # 6. Save aggregated master JSON datasets
    print("\n[*] Writing master indexes and summary data...")
    with open(os.path.join(DIRS["root"], "all_pages_master.json"), "w", encoding="utf-8") as f:
        json.dump(all_page_records, f, indent=2, ensure_ascii=False)

    for cat_name, items in category_buckets.items():
        if items:
            with open(os.path.join(DIRS["root"], f"all_{cat_name}.json"), "w", encoding="utf-8") as f:
                json.dump(items, f, indent=2, ensure_ascii=False)

    # Master manifest
    manifest = {
        "source": BASE_URL,
        "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_pages_scraped": len(all_page_records),
        "total_images_downloaded": downloaded_images,
        "total_docs_downloaded": downloaded_docs,
        "categories_breakdown": {k: len(v) for k, v in category_buckets.items() if len(v) > 0},
        "pages_index": [
            {
                "url": p["url"],
                "slug": p["slug"],
                "category": p["category"],
                "title": p["title"],
                "meta_description": p["meta_description"],
                "image_count": len(p["images"]),
                "markdown_file": f"content_markdown/{p['category']}/{safe_filename(p['slug'])}.md",
                "json_file": f"content_json/{p['category']}/{safe_filename(p['slug'])}.json",
                "html_file": f"raw_html/{p['category']}/{safe_filename(p['slug'])}.html",
            }
            for p in all_page_records
        ]
    }
    with open(os.path.join(DIRS["root"], "scrape_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    # 7. Generate Master README with interactive index and overview
    readme_content = f"""# Sankara Eye Hospital - Complete Scraped Data & Archive

**Source Website:** [{BASE_URL}]({BASE_URL})  
**Date Scraped:** {time.strftime('%Y-%m-%d %H:%M:%S')}  
**Total Pages Scraped:** {len(all_page_records)}  
**Total Images Downloaded:** {downloaded_images}  
**Total Documents/PDFs Downloaded:** {downloaded_docs}  

---

## 📂 Directory Structure

```
scraped_data/
├── scrape_manifest.json       # Complete manifest & index of all scraped pages & files
├── all_pages_master.json      # Master aggregated dataset of all pages
├── all_pages.json             # Core hospital pages (About, Contact, Infrastructure, etc.)
├── all_posts.json             # Blog articles & informational posts
├── all_press.json             # Press releases & news coverage
├── all_testimonials.json      # Patient testimonials & stories
├── all_events.json            # Community & medical events
├── content_markdown/          # High-quality clean Markdown formatted per page
│   ├── pages/
│   ├── posts/
│   ├── press/
│   ├── testimonials/
│   └── events/
├── content_json/              # Structured JSON per page (metadata, headings, links, text)
│   ├── pages/
│   ├── posts/
│   ├── press/
│   ├── testimonials/
│   └── events/
├── raw_html/                  # Exact original raw HTML per page
│   ├── pages/
│   ├── posts/
│   ├── press/
│   ├── testimonials/
│   └── events/
└── assets/                    # All downloaded media & assets
    ├── images/                # Full-resolution photos, doctors, hospital banners, logos
    ├── documents/             # PDFs, reports, forms
    ├── css/                   # Stylesheets
    └── js/                    # Scripts
```

---

## 📊 Summary by Category

| Category | Pages Count | Markdown Directory | JSON Directory |
| :--- | :--- | :--- | :--- |
"""
    for cat_name, items in category_buckets.items():
        if len(items) > 0:
            readme_content += f"| **{cat_name.capitalize()}** | {len(items)} | `content_markdown/{cat_name}/` | `content_json/{cat_name}/` |\n"

    readme_content += """
---

## 📑 Scraped Pages Index

| Title | Category | URL | Markdown File | Raw HTML |
| :--- | :--- | :--- | :--- | :--- |
"""
    for p in all_page_records:
        safe_s = safe_filename(p['slug'])
        readme_content += f"| [{p['title'][:45]}]({p['url']}) | `{p['category']}` | [{p['slug']}]({p['url']}) | [`{safe_s}.md`](content_markdown/{p['category']}/{safe_s}.md) | [`{safe_s}.html`](raw_html/{p['category']}/{safe_s}.html) |\n"

    with open(os.path.join(DIRS["root"], "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    elapsed = round(time.time() - start_time, 2)
    print("\n" + "=" * 60)
    print(f"[✓] SCRAPING COMPLETED IN {elapsed} SECONDS!")
    print(f"[✓] Saved all files to: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    main()
