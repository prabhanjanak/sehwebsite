#!/usr/bin/env python3
"""
High-Performance, Robust Web Scraper and Content Archiver for sankaraeye.com
Extracts all pages, posts, press releases, testimonials, events, raw HTML,
clean Markdown, structured JSON data, high-resolution images, documents (PDFs), CSS, and JS.
"""

import os
import sys
import re
import json
import time
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
import xml.etree.ElementTree as ET
import warnings

# Suppress SSL/urllib3 warnings
warnings.filterwarnings("ignore")

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup

# Ensure immediate terminal output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(line_buffering=True)

BASE_URL = "https://sankaraeye.com"
DOMAIN = "sankaraeye.com"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scraped_data")

# Directory hierarchy
DIRS = {
    "root": OUTPUT_DIR,
    "raw_html": os.path.join(OUTPUT_DIR, "raw_html"),
    "markdown": os.path.join(OUTPUT_DIR, "content_markdown"),
    "json": os.path.join(OUTPUT_DIR, "content_json"),
    "images": os.path.join(OUTPUT_DIR, "assets", "images"),
    "documents": os.path.join(OUTPUT_DIR, "assets", "documents"),
    "css": os.path.join(OUTPUT_DIR, "assets", "css"),
    "js": os.path.join(OUTPUT_DIR, "assets", "js"),
}

for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

def create_session():
    s = requests.Session()
    retries = Retry(
        total=5,
        backoff_factor=1.5,
        status_forcelist=[429, 500, 502, 503, 504],
        raise_on_status=False
    )
    adapter = HTTPAdapter(max_retries=retries, pool_connections=20, pool_maxsize=20)
    s.mount("http://", adapter)
    s.mount("https://", adapter)
    s.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://sankaraeye.com/",
    })
    return s

session = create_session()

def safe_filename(name, default="index", max_len=100):
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
    return path.replace("/", "-")

def classify_url(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "home", "pages"
    
    parts = [p for p in path.split("/") if p]
    first_segment = parts[0].lower() if parts else "home"
    slug = "-".join(parts)
    
    if first_segment in ["press", "press-release", "press-releases", "news"]:
        return slug, "press"
    elif first_segment in ["testimonials", "testimonial", "patient-stories"]:
        return slug, "testimonials"
    elif first_segment in ["events", "tribe_events", "event"]:
        return slug, "events"
    elif first_segment in ["product", "products", "shop"]:
        return slug, "products"
    elif first_segment in ["blog", "posts", "category", "tag", "author"]:
        return slug, "posts"
    elif first_segment in ["doctors", "our-doctors", "doctor"]:
        return slug, "doctors"
    elif first_segment in ["locations", "hospitals", "branches"]:
        return slug, "locations"
    elif first_segment in ["specialities", "speciality", "departments"]:
        return slug, "specialities"
    else:
        return slug, "pages"

def fetch_sitemap_urls():
    sitemaps = [
        f"{BASE_URL}/post-sitemap.xml",
        f"{BASE_URL}/page-sitemap.xml",
        f"{BASE_URL}/product-sitemap.xml",
        f"{BASE_URL}/tribe_events-sitemap.xml",
        f"{BASE_URL}/press-sitemap.xml",
        f"{BASE_URL}/testimonials-sitemap.xml",
    ]
    
    urls = set()
    for sm in sitemaps:
        try:
            r = session.get(sm, timeout=15)
            if r.status_code == 200:
                root = ET.fromstring(r.content)
                ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                for elem in root.findall('.//ns:loc', ns):
                    if elem.text:
                        u = elem.text.strip()
                        if not u.endswith('.xml'):
                            urls.add(u)
                print(f"[+] Loaded sitemap {sm.split('/')[-1]}: {len(urls)} total URLs discovered so far", flush=True)
        except Exception as e:
            print(f"[-] Sitemap {sm} failed: {e}", flush=True)

    return sorted(list(urls))

def html_to_markdown(soup, title, url):
    lines = []
    lines.append(f"# {title}\n")
    lines.append(f"**URL**: [{url}]({url})\n")
    lines.append("---\n")

    body = soup.find('body')
    if not body:
        return f"# {title}\n\nURL: {url}\n"

    # Make a copy of body
    body_copy = BeautifulSoup(str(body), 'html.parser')
    for noise in body_copy.find_all(['script', 'style', 'noscript', 'iframe', 'svg', 'nav', 'header', 'footer']):
        noise.decompose()

    main = (
        body_copy.find('main') or
        body_copy.find('article') or
        body_copy.find('div', class_=re.compile(r'entry-content|post-content|page-content|site-content|content-area|main-content', re.I)) or
        body_copy
    )

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
            t = elem.get_text(strip=True)
            if t:
                lines.append(f"{t}\n")
        elif elem.name == 'blockquote':
            t = elem.get_text(strip=True)
            if t:
                lines.append(f"> {t}\n")
        elif elem.name == 'ul':
            for li in elem.find_all('li', recursive=False):
                t = li.get_text(strip=True)
                if t:
                    lines.append(f"* {t}")
            lines.append("")
        elif elem.name == 'ol':
            for idx, li in enumerate(elem.find_all('li', recursive=False), 1):
                t = li.get_text(strip=True)
                if t:
                    lines.append(f"{idx}. {t}")
            lines.append("")
        elif elem.name == 'img':
            src = elem.get('src') or elem.get('data-src') or elem.get('data-lazy-src')
            alt = elem.get('alt', 'Image')
            if src and not src.startswith('data:') and not 'facebook.com' in src and not 'google' in src:
                lines.append(f"![{alt}]({src})\n")
        elif elem.name == 'table':
            rows = elem.find_all('tr')
            if rows:
                lines.append("")
                for r_idx, r in enumerate(rows):
                    cells = [c.get_text(strip=True) for c in r.find_all(['th', 'td'])]
                    if cells:
                        lines.append("| " + " | ".join(cells) + " |")
                        if r_idx == 0:
                            lines.append("| " + " | ".join(["---"] * len(cells)) + " |")
                lines.append("")

    return "\n".join(lines)

def parse_and_save_page(url, html_bytes):
    soup = BeautifulSoup(html_bytes, 'html.parser')
    slug, category = classify_url(url)
    
    # Metadata
    title_tag = soup.find('title')
    title = title_tag.get_text(strip=True) if title_tag else slug
    
    meta_desc = ""
    meta_keywords = ""
    og = {}
    twitter = {}
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
            og[prop[3:]] = content
        elif name.startswith('twitter:'):
            twitter[name[8:]] = content

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

    # Images
    page_images = set()
    for img in soup.find_all('img'):
        for attr in ['src', 'data-src', 'data-lazy-src', 'data-original', 'srcset', 'data-srcset']:
            val = img.get(attr)
            if val:
                if 'srcset' in attr:
                    parts = [p.strip().split(' ')[0] for p in val.split(',') if p.strip()]
                    for p_url in parts:
                        full_img = urllib.parse.urljoin(url, p_url)
                        if not full_img.startswith('data:'):
                            page_images.add(full_img)
                elif not val.startswith('data:'):
                    page_images.add(urllib.parse.urljoin(url, val))

    for tag in soup.find_all(style=True):
        bg_matches = re.findall(r'url\([\'\"]?(.*?)[\'\"]?\)', tag['style'])
        for bg in bg_matches:
            if not bg.startswith('data:'):
                page_images.add(urllib.parse.urljoin(url, bg))

    # Documents
    documents = set()
    internal_links = set()
    external_links = set()
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        full_a = urllib.parse.urljoin(url, href)
        p = urllib.parse.urlparse(full_a)
        if any(full_a.lower().endswith(ext) for ext in ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.ppt', '.pptx', '.csv']):
            documents.add(full_a)
        elif p.netloc in [DOMAIN, f"www.{DOMAIN}"]:
            clean_l = urllib.parse.urlunparse((p.scheme, p.netloc, p.path, '', '', '')).rstrip('/')
            if clean_l:
                internal_links.add(clean_l)
        elif p.scheme in ['http', 'https']:
            external_links.add(full_a)

    # Styles & scripts
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

    clean_text = soup.get_text(separator=' ', strip=True)
    markdown_content = html_to_markdown(soup, title, url)

    # Save files
    safe_s = safe_filename(slug)

    # Raw HTML
    cat_raw_dir = os.path.join(DIRS["raw_html"], category)
    os.makedirs(cat_raw_dir, exist_ok=True)
    with open(os.path.join(cat_raw_dir, f"{safe_s}.html"), "wb") as f:
        f.write(html_bytes)

    # Markdown
    cat_md_dir = os.path.join(DIRS["markdown"], category)
    os.makedirs(cat_md_dir, exist_ok=True)
    with open(os.path.join(cat_md_dir, f"{safe_s}.md"), "w", encoding="utf-8") as f:
        f.write(markdown_content)

    # JSON
    data = {
        "url": url,
        "slug": slug,
        "category": category,
        "title": title,
        "meta_description": meta_desc,
        "meta_keywords": meta_keywords,
        "og": og,
        "twitter": twitter,
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

    cat_json_dir = os.path.join(DIRS["json"], category)
    os.makedirs(cat_json_dir, exist_ok=True)
    with open(os.path.join(cat_json_dir, f"{safe_s}.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return data, page_images, documents, css_files, js_files, internal_links

def download_file(url, target_dir, referer=BASE_URL):
    try:
        parsed = urllib.parse.urlparse(url)
        path = parsed.path.strip("/")
        if not path:
            return None
        
        filename = os.path.basename(path)
        if not filename or '.' not in filename:
            filename = safe_filename(path) + ".file"
        else:
            base, ext = os.path.splitext(filename)
            ext = ext.split('?')[0]
            filename = safe_filename(base) + ext
            
        target_path = os.path.join(target_dir, filename)
        if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
            return target_path

        r = session.get(url, headers={"Referer": referer}, timeout=20)
        if r.status_code == 200 and len(r.content) > 0:
            with open(target_path, "wb") as f:
                f.write(r.content)
            return target_path
    except Exception:
        pass
    return None

def main():
    print("=" * 65, flush=True)
    print("🚀 SANKARA EYE HOSPITAL - FULL SCRAPER & CONTENT EXTRACTOR", flush=True)
    print("=" * 65, flush=True)
    start_time = time.time()

    # Step 1: Get URLs from sitemaps
    print("\n🔍 Step 1: Discovering all URLs from XML Sitemaps...", flush=True)
    sitemap_urls = fetch_sitemap_urls()
    
    # Always include homepage
    all_target_urls = set(sitemap_urls)
    all_target_urls.add(f"{BASE_URL}/")
    all_target_urls.add(f"{BASE_URL}")

    print(f"\n📥 Step 2: Fetching and Scraping {len(all_target_urls)} Pages...", flush=True)

    all_page_data = []
    all_images = set()
    all_docs = set()
    all_css = set()
    all_js = set()
    all_extra_links = set()

    categories_count = {}

    def worker(target_url):
        try:
            r = session.get(target_url, timeout=20)
            if r.status_code == 200 and len(r.content) > 500:
                data, imgs, docs, css, js, links = parse_and_save_page(target_url, r.content)
                return {
                    "success": True,
                    "url": target_url,
                    "data": data,
                    "imgs": imgs,
                    "docs": docs,
                    "css": css,
                    "js": js,
                    "links": links
                }
            else:
                return {"success": False, "url": target_url, "error": f"HTTP {r.status_code}"}
        except Exception as e:
            return {"success": False, "url": target_url, "error": str(e)}

    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(worker, u): u for u in all_target_urls}
        done = 0
        total = len(all_target_urls)
        for f in as_completed(futures):
            done += 1
            res = f.result()
            if res["success"]:
                d = res["data"]
                all_page_data.append(d)
                all_images.update(res["imgs"])
                all_docs.update(res["docs"])
                all_css.update(res["css"])
                all_js.update(res["js"])
                all_extra_links.update(res["links"])

                cat = d["category"]
                categories_count[cat] = categories_count.get(cat, 0) + 1

                print(f"  [{done}/{total}] ✓ [{cat.upper()}] {d['title'][:40]} ({d['url']})", flush=True)
            else:
                print(f"  [{done}/{total}] ✗ Failed: {res['url']} ({res.get('error')})", flush=True)

    # Step 2b: Crawl any newly discovered internal URLs
    unvisited = [l for l in all_extra_links if l not in all_target_urls and '/wp-admin' not in l and '/feed' not in l]
    if unvisited:
        print(f"\n🔍 Step 2b: Scraping {len(unvisited)} additional discovered links...", flush=True)
        with ThreadPoolExecutor(max_workers=6) as executor:
            futures = {executor.submit(worker, u): u for u in unvisited}
            for f in as_completed(futures):
                res = f.result()
                if res["success"]:
                    d = res["data"]
                    all_page_data.append(d)
                    all_images.update(res["imgs"])
                    all_docs.update(res["docs"])
                    all_css.update(res["css"])
                    all_js.update(res["js"])
                    cat = d["category"]
                    categories_count[cat] = categories_count.get(cat, 0) + 1
                    print(f"  ✓ [DISCOVERED/{cat.upper()}] {d['title'][:40]}", flush=True)

    print(f"\n📊 Summary of Scraped Pages ({len(all_page_data)} total):", flush=True)
    for cat, cnt in sorted(categories_count.items()):
        print(f"   • {cat}: {cnt} pages", flush=True)

    # Step 3: Download Images
    valid_images = [img for img in all_images if not img.startswith('data:') and 'facebook.com' not in img and 'google' not in img]
    print(f"\n🖼️  Step 3: Downloading {len(valid_images)} unique images...", flush=True)
    img_dl_count = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_file, img_url, DIRS["images"]): img_url for img_url in valid_images}
        for f in as_completed(futures):
            if f.result():
                img_dl_count += 1
                if img_dl_count % 25 == 0 or img_dl_count == len(valid_images):
                    print(f"  Downloaded {img_dl_count}/{len(valid_images)} images...", flush=True)

    print(f"  ✓ Total images saved to assets/images/: {img_dl_count}", flush=True)

    # Step 4: Download Documents
    print(f"\n📄 Step 4: Downloading {len(all_docs)} documents & PDFs...", flush=True)
    doc_dl_count = 0
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(download_file, doc_url, DIRS["documents"]): doc_url for doc_url in all_docs}
        for f in as_completed(futures):
            if f.result():
                doc_dl_count += 1
    print(f"  ✓ Total documents saved to assets/documents/: {doc_dl_count}", flush=True)

    # Step 5: Download Stylesheets & JS
    print(f"\n🎨 Step 5: Downloading CSS & JavaScript assets...", flush=True)
    for css_url in all_css:
        if DOMAIN in css_url or 'fonts' in css_url or 'wp-content' in css_url:
            download_file(css_url, DIRS["css"])
    for js_url in all_js:
        if DOMAIN in js_url or 'wp-content' in js_url:
            download_file(js_url, DIRS["js"])

    # Step 6: Master Datasets & Indices
    print(f"\n💾 Step 6: Generating master datasets and indexes...", flush=True)
    
    # Save Master JSON
    with open(os.path.join(DIRS["root"], "all_pages_master.json"), "w", encoding="utf-8") as f:
        json.dump(all_page_data, f, indent=2, ensure_ascii=False)

    # Group by category
    by_cat = {}
    for p in all_page_data:
        cat = p["category"]
        if cat not in by_cat:
            by_cat[cat] = []
        by_cat[cat].append(p)

    for cat_name, items in by_cat.items():
        with open(os.path.join(DIRS["root"], f"all_{cat_name}.json"), "w", encoding="utf-8") as f:
            json.dump(items, f, indent=2, ensure_ascii=False)

    # Manifest
    manifest = {
        "source": BASE_URL,
        "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_pages_scraped": len(all_page_data),
        "total_images_downloaded": img_dl_count,
        "total_docs_downloaded": doc_dl_count,
        "categories": {k: len(v) for k, v in by_cat.items()},
        "pages": [
            {
                "url": p["url"],
                "slug": p["slug"],
                "category": p["category"],
                "title": p["title"],
                "meta_description": p["meta_description"],
                "headings_h1": p["headings"]["h1"],
                "image_count": len(p["images"]),
                "markdown_file": f"content_markdown/{p['category']}/{safe_filename(p['slug'])}.md",
                "json_file": f"content_json/{p['category']}/{safe_filename(p['slug'])}.json",
                "html_file": f"raw_html/{p['category']}/{safe_filename(p['slug'])}.html",
            }
            for p in all_page_data
        ]
    }
    with open(os.path.join(DIRS["root"], "scrape_manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    # Step 7: Master README Index
    readme_lines = [
        "# Sankara Eye Hospital - Complete Web Scraping Archive",
        "",
        f"- **Source Website:** [{BASE_URL}]({BASE_URL})",
        f"- **Scrape Date:** {time.strftime('%Y-%m-%d %H:%M:%S')}",
        f"- **Total Pages Scraped:** {len(all_page_data)}",
        f"- **Total Images Downloaded:** {img_dl_count}",
        f"- **Total Documents/PDFs:** {doc_dl_count}",
        "",
        "---",
        "",
        "## 📂 Directory Structure",
        "",
        "```",
        "scraped_data/",
        "├── scrape_manifest.json       # Complete manifest & index of all pages & files",
        "├── all_pages_master.json      # Master combined dataset of all scraped pages",
        "├── all_pages.json             # Core hospital pages (About, Contact, Infrastructure, etc.)",
        "├── all_posts.json             # Blog articles & eye care guides",
        "├── all_press.json             # Press releases & news coverage",
        "├── all_testimonials.json      # Patient testimonials & stories",
        "├── all_events.json            # Events & community programs",
        "├── all_products.json          # Optical products & packages",
        "├── content_markdown/          # High-quality clean Markdown formatted per page",
        "├── content_json/              # Structured JSON data per page (metadata, headings, links)",
        "├── raw_html/                  # Original raw HTML for every single page",
        "└── assets/",
        "    ├── images/                # Full-res doctor photos, hospital banners, logos",
        "    ├── documents/             # PDFs, patient brochures, reports",
        "    ├── css/                   # Stylesheets",
        "    └── js/                    # Scripts",
        "```",
        "",
        "---",
        "",
        "## 📊 Breakdown by Section",
        "",
        "| Section | Page Count | Markdown Folder | JSON Folder |",
        "| :--- | :--- | :--- | :--- |",
    ]

    for cat_name, items in sorted(by_cat.items()):
        readme_lines.append(f"| **{cat_name.capitalize()}** | {len(items)} | [`content_markdown/{cat_name}/`](content_markdown/{cat_name}/) | [`content_json/{cat_name}/`](content_json/{cat_name}/) |")

    readme_lines.extend([
        "",
        "---",
        "",
        "## 📑 Index of Scraped Pages",
        "",
        "| Title | Category | Slug | Markdown | Raw HTML |",
        "| :--- | :--- | :--- | :--- | :--- |",
    ])

    for p in sorted(all_page_data, key=lambda x: (x['category'], x['title'])):
        safe_s = safe_filename(p['slug'])
        short_title = p['title'][:50].replace('|', '-')
        readme_lines.append(f"| [{short_title}]({p['url']}) | `{p['category']}` | `{p['slug']}` | [`{safe_s}.md`](content_markdown/{p['category']}/{safe_s}.md) | [`{safe_s}.html`](raw_html/{p['category']}/{safe_s}.html) |")

    with open(os.path.join(DIRS["root"], "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(readme_lines))

    # Step 8: Build Interactive HTML Dashboard / Viewer
    dashboard_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sankara Eye Hospital - Scraped Data Archive</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-main: #0b0f19;
      --bg-card: #131b2e;
      --bg-card-hover: #1a253e;
      --primary: #0284c7;
      --primary-light: #38bdf8;
      --accent: #10b981;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --border: #1e293b;
      --tag-pages: #0284c7;
      --tag-posts: #8b5cf6;
      --tag-press: #f59e0b;
      --tag-testimonials: #ec4899;
      --tag-events: #10b981;
      --tag-products: #06b6d4;
    }}
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg-main);
      color: var(--text-main);
      padding: 40px 24px;
      line-height: 1.6;
    }}
    .container {{
      max-width: 1300px;
      margin: 0 auto;
    }}
    header {{
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(16, 185, 129, 0.1));
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 36px 40px;
      margin-bottom: 32px;
      backdrop-filter: blur(12px);
    }}
    .badge {{
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary-light);
      background: rgba(56, 189, 248, 0.12);
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
      border: 1px solid rgba(56, 189, 248, 0.25);
    }}
    h1 {{
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      background: linear-gradient(90deg, #ffffff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    .subtitle {{
      color: var(--text-muted);
      font-size: 15px;
    }}
    .stats-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }}
    .stat-card {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px 24px;
      transition: all 0.2s ease;
    }}
    .stat-card:hover {{
      border-color: var(--primary);
      transform: translateY(-2px);
    }}
    .stat-val {{
      font-size: 32px;
      font-weight: 800;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
    }}
    .stat-label {{
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
      font-weight: 500;
    }}
    .controls {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
      align-items: center;
      justify-content: space-between;
    }}
    .search-box {{
      flex: 1;
      min-width: 280px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 18px;
      color: var(--text-main);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s ease;
    }}
    .search-box:focus {{
      border-color: var(--primary-light);
    }}
    .filter-pills {{
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }}
    .filter-pill {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 8px 16px;
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .filter-pill.active, .filter-pill:hover {{
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }}
    .table-container {{
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }}
    thead th {{
      background: rgba(2, 6, 23, 0.6);
      padding: 16px 20px;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
    }}
    tbody tr {{
      border-bottom: 1px solid rgba(30, 41, 59, 0.6);
      transition: background 0.15s ease;
    }}
    tbody tr:hover {{
      background: var(--bg-card-hover);
    }}
    tbody td {{
      padding: 16px 20px;
      vertical-align: middle;
    }}
    .page-title {{
      font-weight: 600;
      color: #fff;
      display: block;
      margin-bottom: 4px;
      text-decoration: none;
    }}
    .page-title:hover {{
      color: var(--primary-light);
    }}
    .page-meta {{
      font-size: 12px;
      color: var(--text-muted);
    }}
    .cat-tag {{
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
    }}
    .cat-pages {{ color: #38bdf8; background: rgba(56, 189, 248, 0.12); }}
    .cat-posts {{ color: #a78bfa; background: rgba(167, 139, 250, 0.12); }}
    .cat-press {{ color: #fbbf24; background: rgba(251, 191, 36, 0.12); }}
    .cat-testimonials {{ color: #f472b6; background: rgba(244, 114, 182, 0.12); }}
    .cat-events {{ color: #34d399; background: rgba(52, 211, 153, 0.12); }}
    .cat-products {{ color: #22d3ee; background: rgba(34, 211, 238, 0.12); }}
    .links-cell {{
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }}
    .action-btn {{
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
      text-decoration: none;
      border: 1px solid var(--border);
      transition: all 0.2s ease;
    }}
    .action-btn:hover {{
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--primary-light);
      color: #fff;
    }}
    .action-btn.md {{ color: #38bdf8; }}
    .action-btn.json {{ color: #34d399; }}
    .action-btn.html {{ color: #fbbf24; }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">Archive & Dataset Ready</div>
      <h1>Sankara Eye Hospital — Full Scraped Website Archive</h1>
      <p class="subtitle">Complete offline archive with clean Markdown, structured JSON datasets, raw HTML, full-resolution images, and downloadable media.</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-val">{len(all_page_data)}</div>
        <div class="stat-label">Total Pages Scraped</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{img_dl_count}</div>
        <div class="stat-label">Images Downloaded</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{doc_dl_count}</div>
        <div class="stat-label">Documents & PDFs</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{len(by_cat)}</div>
        <div class="stat-label">Content Categories</div>
      </div>
    </div>

    <div class="controls">
      <input type="text" id="searchInput" class="search-box" placeholder="🔍 Search by page title, slug, or category..." onkeyup="filterTable()">
      <div class="filter-pills">
        <button class="filter-pill active" onclick="setCategoryFilter('all')">All ({len(all_page_data)})</button>
"""
    for cat_name, items in sorted(by_cat.items()):
        dashboard_html += f'        <button class="filter-pill" onclick="setCategoryFilter(\'{cat_name}\')">{cat_name.capitalize()} ({len(items)})</button>\n'

    dashboard_html += f"""      </div>
    </div>

    <div class="table-container">
      <table id="pagesTable">
        <thead>
          <tr>
            <th style="width: 45%;">Page Title & Info</th>
            <th style="width: 15%;">Category</th>
            <th style="width: 10%;">Images</th>
            <th style="width: 30%;">Access Scraped Files</th>
          </tr>
        </thead>
        <tbody>
"""
    for p in sorted(all_page_data, key=lambda x: (x['category'], x['title'])):
        safe_s = safe_filename(p['slug'])
        cat = p['category']
        title = p['title'].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        desc = p['meta_description'][:100].replace('&', '&amp;').replace('<', '&lt;') if p['meta_description'] else p['slug']
        
        dashboard_html += f"""          <tr data-category="{cat}">
            <td>
              <a href="{p['url']}" target="_blank" class="page-title">{title}</a>
              <div class="page-meta">{desc}</div>
            </td>
            <td><span class="cat-tag cat-{cat}">{cat}</span></td>
            <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 13px;">📷 {len(p['images'])}</span></td>
            <td>
              <div class="links-cell">
                <a href="content_markdown/{cat}/{safe_s}.md" class="action-btn md" target="_blank">📝 Markdown</a>
                <a href="content_json/{cat}/{safe_s}.json" class="action-btn json" target="_blank">🧩 JSON</a>
                <a href="raw_html/{cat}/{safe_s}.html" class="action-btn html" target="_blank">🌐 HTML</a>
              </div>
            </td>
          </tr>
"""

    dashboard_html += """        </tbody>
      </table>
    </div>
  </div>

  <script>
    let currentCategory = 'all';

    function setCategoryFilter(cat) {
      currentCategory = cat;
      document.querySelectorAll('.filter-pill').forEach(el => {
        if ((cat === 'all' && el.innerText.startsWith('All')) || el.innerText.toLowerCase().startsWith(cat)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
      filterTable();
    }

    function filterTable() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const rows = document.querySelectorAll('#pagesTable tbody tr');

      rows.forEach(row => {
        const cat = row.getAttribute('data-category');
        const text = row.innerText.toLowerCase();
        const matchesCat = (currentCategory === 'all' || cat === currentCategory);
        const matchesQuery = text.includes(query);

        if (matchesCat && matchesQuery) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
"""

    with open(os.path.join(DIRS["root"], "index.html"), "w", encoding="utf-8") as f:
        f.write(dashboard_html)

    elapsed = round(time.time() - start_time, 2)
    print("\n" + "=" * 65, flush=True)
    print(f"🎉 SCRAPING AND ARCHIVING COMPLETED IN {elapsed}s!", flush=True)
    print(f"📁 Output Directory: {OUTPUT_DIR}", flush=True)
    print(f"🌐 Dashboard File: {os.path.join(OUTPUT_DIR, 'index.html')}", flush=True)
    print("=" * 65, flush=True)

if __name__ == "__main__":
    main()
