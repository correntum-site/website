// Representative sample data. Not real documents, suppliers or transactions.
// Used only to give the walkthrough something concrete to move through.

// state: one of "blocks" | "look" | "clean"
export const QUEUE_ROWS = [
  {
    ref: "GRN-2318",
    type: "Delivery note",
    party: "Boland Packaging",
    exception: "Supplier not on file",
    source: "WhatsApp",
    state: "blocks",
  },
  {
    ref: "INV-88214",
    type: "Supplier invoice",
    party: "Kruger Foods",
    exception: "Line total does not match",
    source: "Email",
    state: "look",
    hero: true,
  },
  {
    ref: "SUP-0412",
    type: "New supplier form",
    party: "Verwey Plumbing",
    exception: "VAT number not verified",
    source: "Email",
    state: "blocks",
  },
  {
    ref: "INV-88219",
    type: "Supplier invoice",
    party: "Mbeki Logistics",
    exception: "No purchase order matched",
    source: "Email",
    state: "look",
  },
  {
    ref: "GRN-2321",
    type: "Delivery note",
    party: "Thabo Freight",
    exception: "Reads cleanly, 6 lines",
    source: "PDF",
    state: "clean",
  },
  {
    ref: "GRN-2324",
    type: "Delivery note",
    party: "Kruger Foods",
    exception: "Quantity over order",
    source: "WhatsApp",
    state: "look",
  },
  {
    ref: "ACC-3390",
    type: "Contact update",
    party: "Naledi Retail Group",
    exception: "Contact not on account",
    source: "Email",
    state: "look",
  },
  {
    ref: "GRN-2327",
    type: "Delivery note",
    party: "Thabo Freight",
    exception: "Delivery date missing",
    source: "WhatsApp",
    state: "look",
  },
  {
    ref: "INV-88221",
    type: "Supplier invoice",
    party: "Cederberg Cold Store",
    exception: "Reads cleanly, 3 lines",
    source: "Email",
    state: "clean",
  },
  {
    ref: "SUP-0417",
    type: "New supplier form",
    party: "Oranje Electrical",
    exception: "Bank details need a check",
    source: "Email",
    state: "blocks",
  },
  {
    ref: "GRN-2330",
    type: "Delivery note",
    party: "Boland Packaging",
    exception: "Reads cleanly, 9 lines",
    source: "PDF",
    state: "clean",
  },
];

// The hero item, INV-88214. One line where the read values do not match.
export const INVOICE = {
  ref: "INV-88214",
  state: "look",
  type: "Supplier invoice",
  party: "Kruger Foods",
  source: "Email",
  exception: "Line total does not match",
  heldField: "Line 2 total",
  lines: [
    {
      ln: "1",
      code: "FLR-25",
      description: "Cake flour, 25kg",
      ordered: "40",
      received: "40",
      mismatch: false,
    },
    {
      ln: "2",
      code: "SUG-10",
      description: "White sugar, 10kg",
      ordered: "60",
      received: "54",
      mismatch: true,
    },
    {
      ln: "3",
      code: "YST-1",
      description: "Instant yeast, 1kg",
      ordered: "12",
      received: "12",
      mismatch: false,
    },
  ],
};

export const STATE_LABEL = {
  blocks: "Blocks",
  look: "Needs a look",
  clean: "Clean",
};
