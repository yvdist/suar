export function phoneLink(phone: string): string {
  const clean = phone.trim().replace(/[\s\-().]/g, "");
  return `tel:${clean}`;
}

export function whatsappLink(whatsapp: string): string {
  let digits = whatsapp.trim().replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  }
  return `https://wa.me/${digits}`;
}

export function displaySite(site: string): string {
  return site
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

export function mapLink(address: string, city: string): string {
  const query = encodeURIComponent(`${address}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function visitInfo(
  online: boolean,
  inPerson: boolean,
  needsReferral: boolean,
  needsAppointment: boolean,
): string[] {
  const sentences: string[] = [];
  if (online && inPerson) {
    sentences.push("Tersedia tatap muka dan online.");
  } else if (online) {
    sentences.push("Layanan online.");
  } else if (inPerson) {
    sentences.push("Layanan tatap muka.");
  }
  const terms: string[] = [];
  if (needsAppointment) {
    terms.push("perlu janji temu dulu");
  } else {
    terms.push("tidak perlu janji temu");
  }
  if (needsReferral) {
    terms.push("perlu rujukan dari faskes tingkat 1");
  } else {
    terms.push("bisa langsung datang tanpa rujukan");
  }
  sentences.push(`${terms[0]![0]!.toUpperCase()}${terms[0]!.slice(1)}, ${terms[1]}.`);
  return sentences;
}

export function shortDescription(
  name: string,
  type: string,
  city: string,
  price: string,
): string {
  return `${name}, layanan ${type} di ${city}. ${price}.`;
}

const REPORT_EMAIL = "contact@yvdist.com";

export function reportLink(name: string, slug: string): string {
  const subject = encodeURIComponent(`Koreksi data: ${name}`);
  const body = encodeURIComponent(
    `Layanan: ${name} (${slug})\n\nYang perlu diperbaiki:\n\nKontak balik (opsional):\n`,
  );
  return `mailto:${REPORT_EMAIL}?subject=${subject}&body=${body}`;
}
