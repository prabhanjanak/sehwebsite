// ============================================================================
// DOCTOR STRING PARSER FOR AUTHENTIC HOSPITAL REGISTRY
// Parses strings like "Dr. Nisha Ahuja – MBBS, DOMS, FCRS (Chief Medical Officer, Cataract...)"
// into clean, structured doctor profiles with name, qualifications, department, and role.
// ============================================================================

export interface ParsedDoctor {
  raw: string;
  name: string;
  qualifications: string;
  department: string;
  isCMO: boolean;
}

export function parseDoctor(raw: string): ParsedDoctor {
  let text = raw.replace(/\u00a0/g, ' ').trim();
  const isCMO = /chief medical officer/i.test(text);

  let department = '';
  // Check trailing brackets or parens: [...] or (...)
  const bMatch = text.match(/[\(\[]\s*([^\(\)\[\]]*?)\s*[\)\]]\s*$/);
  if (bMatch) {
    department = bMatch[1].trim();
    text = text.substring(0, text.length - bMatch[0].length).trim();
  }

  let name = text;
  let qualifications = '';

  const degRegex = /\b(MBBS|MS|MD|DNB|DO|DOMS|FRCS|FRCSEd|FICO|FCRS|FAICO|FVRS|FPOS|FAEH|FMR|FMRF|FCMS|FOO|FCO|FGS|FGAS|FIOL|FICA|DA|MBA|Ph\.D)\b/i;
  const m = text.match(degRegex);
  if (m && m.index && m.index > 3) {
    name = text.substring(0, m.index).replace(/[\s,–-]+$/, '').trim();
    qualifications = text.substring(m.index).trim();
  }

  qualifications = qualifications.replace(/^[-–,\s]+/, '').replace(/[-–,\s]+$/, '').trim();
  name = name.replace(/^[-–,\s]+/, '').replace(/[-–,\s]+$/, '').trim();

  // If department was not captured, check qualifications string
  if (!department) {
    if (/consultant|registrar|surgeon|ophthalmology|retina|glaucoma|cornea|cataract/i.test(qualifications)) {
      const parts = qualifications.split(/[-–]/);
      if (parts.length > 1) {
        qualifications = parts[0].trim();
        department = parts.slice(1).join(' – ').trim();
      }
    }
  }

  return {
    raw,
    name: name || raw,
    qualifications,
    department: department || (isCMO ? 'Chief Medical Officer' : 'Consultant Ophthalmologist'),
    isCMO
  };
}
