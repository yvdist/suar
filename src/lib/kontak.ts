export function tautanTelepon(telepon: string): string {
  const bersih = telepon.trim().replace(/[\s\-().]/g, "");
  return `tel:${bersih}`;
}

export function tautanWhatsapp(whatsapp: string): string {
  let digit = whatsapp.trim().replace(/\D/g, "");
  if (digit.startsWith("0")) {
    digit = `62${digit.slice(1)}`;
  }
  return `https://wa.me/${digit}`;
}

export function tampilanSitus(situs: string): string {
  return situs
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

export function tautanPeta(alamat: string, kota: string): string {
  const query = encodeURIComponent(`${alamat}, ${kota}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function kalimatCaraDatang(
  online: boolean,
  tatapMuka: boolean,
  perluRujukan: boolean,
  perluJanji: boolean,
): string[] {
  const kalimat: string[] = [];
  if (online && tatapMuka) {
    kalimat.push("Tersedia tatap muka dan online.");
  } else if (online) {
    kalimat.push("Layanan online.");
  } else if (tatapMuka) {
    kalimat.push("Layanan tatap muka.");
  }
  const syarat: string[] = [];
  if (perluJanji) {
    syarat.push("perlu janji temu dulu");
  } else {
    syarat.push("tidak perlu janji temu");
  }
  if (perluRujukan) {
    syarat.push("perlu rujukan dari faskes tingkat 1");
  } else {
    syarat.push("bisa langsung datang tanpa rujukan");
  }
  kalimat.push(`${syarat[0]![0]!.toUpperCase()}${syarat[0]!.slice(1)}, ${syarat[1]}.`);
  return kalimat;
}

export function deskripsiSingkat(
  nama: string,
  jenis: string,
  kota: string,
  harga: string,
): string {
  return `${nama}, layanan ${jenis} di ${kota}. ${harga}.`;
}
