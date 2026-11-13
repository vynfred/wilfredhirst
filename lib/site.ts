// Every line of copy on the site, and the few facts the pages share.
// Words change here, not in the components.

export const SITE = "https://wilfredhirst.com";
export const STUDIO = "https://vynfred.com";
export const CONTACT = "info@vynfred.com";

export const LINKS = {
  instagram: "https://www.instagram.com/vynfred",
  linkedin: "https://www.linkedin.com/in/wilfredhirst",
};

export const HOME = {
  title: "Wilfred Hirst",
  line: "Charcoal, pastel, oil pen and collage.",
  // Third person, and only what vynfred.com already says about him: the
  // media and the year, the sculpture, the showing, and the road here.
  // A draft until Wilfred has read it.
  bio: [
    "Wilfred Hirst is an artist working in charcoal, pastel, oil pen and collage, a practice he has kept since 2017. His work has been shown at festivals and galleries, and a 27-foot steel sculpture, Five Triangles, is in proposal for Woodward Hill Park.",
    "He grew up on the South Shore of Massachusetts, studied architecture at the Boston Architectural College, and spent a decade as a working DJ in Boston. Architecture taught him to look at the details and iterate.",
  ],
  galleryCta: "See the gallery",
  studio: {
    label: "The studio",
    heading: "The art practice also runs a studio.",
    body: "Vynfred is a design, technology and go-to-market studio for founders. It grew out of this work, which is why what it makes looks the way it does.",
    cta: "Visit vynfred.com",
  },
  contact: {
    label: "Contact",
    heading: "Prints, originals and commissions.",
    body: "Ask about a piece, a print, or something made for a place.",
  },
};

export const GALLERY_LEAD = {
  title: "Gallery",
  line: "Stills and work in motion. Select a piece for its title and to ask about it.",
};

// A mail link that already says which piece it is about.
export const askAbout = (title?: string) =>
  `mailto:${CONTACT}?subject=${encodeURIComponent(title ? `About "${title}"` : "About the work")}`;
