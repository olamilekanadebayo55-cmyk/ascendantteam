export interface InfoPage { title: string; description: string; placeholder?: boolean; sections: { h: string; p: string[] }[] }
const PH = "Development placeholder: final text must be supplied and approved by Ascendant Groups before launch.";
export const PAGES: Record<string, InfoPage> = {
  about: { title: "About Ascendant Talent", description: "What Ascendant Talent does and what it does not do.", sections: [
    { h: "What we do", p: ["Ascendant Talent researches publicly available career opportunities, organizes verified job information, answers candidate enquiries, and discusses talent-research services with employers and recruitment agencies. It operates under Ascendant Groups."] },
    { h: "What we do not claim", p: ["Unless a listing says otherwise, we do not represent the employer and are not running the recruitment. We publish no testimonials, statistics or partnerships we cannot document."] },
    { h: "Company details", p: [PH] } ], placeholder: true },
  "how-it-works": { title: "How it works", description: "How an opportunity gets from the public web to a verified listing.", sections: [
    { h: "1. A public vacancy is found", p: ["A team member finds a vacancy published by an employer or another public source and records where it came from."] },
    { h: "2. The source is checked", p: ["An administrator reviews the source and confirms the details against it. A listing cannot be published without a source link and a verification date."] },
    { h: "3. The listing is classified", p: ["Each listing is labelled as independently researched, a public employer listing, or an authorized recruitment assignment. The last label is used only when authorization has been verified."] },
    { h: "4. You apply through the official channel", p: ["Every listing links to the official source. Confirm details there before applying. Listings are re-checked and removed when they expire or are withdrawn."] } ] },
  candidates: { title: "For candidates", description: "Ask a question about an opportunity or tell us what you are looking for.", placeholder: true, sections: [
    { h: "Enquiries", p: ["The candidate enquiry form, with privacy notice and optional CV upload, is in development and is not yet available.", PH] } ] },
  employers: { title: "For employers and agencies", description: "Discuss talent research or opportunity research with Ascendant Talent.", placeholder: true, sections: [
    { h: "Discuss a requirement", p: ["Ascendant Talent is open to discussing talent research, opportunity research, candidate sourcing and agency collaboration. No recruitment partnerships are implied by this page.", "The employer enquiry form is in development and is not yet available.", PH] } ] },
  contact: { title: "Contact", description: "Contact Ascendant Talent.", placeholder: true, sections: [{ h: "Get in touch", p: ["Contact details are to be supplied by Ascendant Groups.", PH] }] },
  privacy: { title: "Privacy notice", description: "How personal information is handled.", placeholder: true, sections: [{ h: "Privacy notice", p: [PH] }] },
  terms: { title: "Terms of use", description: "Terms of use for this website.", placeholder: true, sections: [{ h: "Terms of use", p: [PH] }] },
  disclaimer: { title: "Opportunity and recruitment disclaimer", description: "What the labels on our listings mean.", sections: [
    { h: "Independently researched", p: ["Found by us in public sources. We may not represent the employer. Confirm details through the official application channel."] },
    { h: "Public employer listing", p: ["Published by the employer and shared for information. We do not act for the employer unless stated."] },
    { h: "Authorized recruitment assignment", p: ["Shown only after an administrator has verified our authorization to recruit for the role."] },
    { h: "Accuracy", p: ["We check listings when published and record the date. Vacancies can close without notice, so always confirm with the employer."] } ] },
};
