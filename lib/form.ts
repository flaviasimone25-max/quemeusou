export const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdKjQgCckjQsVjYFfR5Jdrd_S-GJ_Dpw1YkVj8hsNQW0-dmIA/formResponse";

export const GOOGLE_FORM_ENTRIES = {
  name: "entry.1617193906",
  whatsapp: "entry.1146988491",
  profession: "entry.1165953150",
};

export async function submitLead(payload: {
  name: string;
  whatsapp: string;
  profession: string;
}) {
  const body = new URLSearchParams({
    [GOOGLE_FORM_ENTRIES.name]: payload.name.trim(),
    [GOOGLE_FORM_ENTRIES.whatsapp]: payload.whatsapp.trim(),
    [GOOGLE_FORM_ENTRIES.profession]: payload.profession.trim(),
  });

  await fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}
