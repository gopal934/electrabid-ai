import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bolt,
  Building2,
  Cable,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Factory,
  FileText,
  Headphones,
  Loader2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// --- Mock Data ---
const sampleRequirements = [
  {
    id: "RFQ-24001",
    title: "LED High Bay Lights",
    details: "120W, 6500K, IP65 – 200 units",
    location: "Pune, MH",
    created: "Today",
    bids: 6,
    budget: "₹7.8L",
  },
  {
    id: "RFQ-24002",
    title: "XLPE Aluminium Cables",
    details: "3.5C x 240 sqmm – 1.2km",
    location: "Ahmedabad, GJ",
    created: "3h ago",
    bids: 9,
    budget: "₹22L",
  },
  {
    id: "RFQ-24003",
    title: "Distribution Boards & MCBs",
    details: "10 DBs + 400 MCBs (C-curve)",
    location: "Bengaluru, KA",
    created: "Yesterday",
    bids: 4,
    budget: "₹5.2L",
  },
];

const supplierPool = [
  { name: "SkyLite Electricals", city: "Mumbai", rating: 4.7, verified: true, tags: ["LED", "Panels", "Street Lights"] },
  { name: "ProCable Distributors", city: "Surat", rating: 4.5, verified: true, tags: ["XLPE Cables", "Lugs", "Glands"] },
  { name: "Switchon Traders", city: "Jaipur", rating: 4.3, verified: false, tags: ["Switchgear", "MCB", "MCCB"] },
];

export default function ElectraBidMock() {
  const [buyerForm, setBuyerForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    category: "LED Lighting",
    items: "",
    qty: "",
    location: "",
    notes: "",
    needEscrow: true,
  });
  const [supplierForm, setSupplierForm] = useState({
    biz: "",
    contact: "",
    phone: "",
    email: "",
    city: "",
    products: "LED, Cables, Switchgear",
    gst: "",
    wantsLeads: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [rfqId, setRfqId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<"home" | "rfqs" | "suppliers" | "pricing" | "how">("home");

  const aiHints = useMemo(() => {
    // Simple, local "AI" suggestions to show the feel
    const hints: Record<string, string[]> = {
      "LED Lighting": [
        "Consider 120–150 lm/W fixtures to reduce power bills by ~18–22%",
        "Prefer BIS-mark + 5yr warranty for high bays",
        "Ask for L70>50k hours; CRI≥80 for warehouses",
      ],
      Cables: [
        "Mention conductor material (Cu/Al) and insulation (XLPE/PVC)",
        "Specify run length per drum & test certificates",
        "Add required lugs/glands in BOM to save time",
      ],
      Switchgear: [
        "Define breaking capacity (kA) & curve (B/C/D)",
        "List make equivalents to increase competition",
        "Request IS/IEC compliance sheets",
      ],
    };
    const key = buyerForm.category.includes("LED") ? "LED Lighting" : buyerForm.category.includes("Cable") ? "Cables" : "Switchgear";
    return hints[key];
  }, [buyerForm.category]);

  function submitRFQ(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const id = `RFQ-${Math.floor(10000 + Math.random()*89999)}`;
      setRfqId(id);
      setSubmitting(false);
      setDialogOpen(true);
    }, 900);
  }

  function submitSupplier(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDialogOpen(true);
      setRfqId(null);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Nav */}
      <nav className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <Bolt className="h-6 w-6 text-amber-500" />
            ElectraBid<span className="text-amber-500">.ai</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <button onClick={() => setView("home")} className="hover:text-amber-600">Home</button>
            <button onClick={() => setView("rfqs")} className="hover:text-amber-600">Live RFQs</button>
            <button onClick={() => setView("suppliers")} className="hover:text-amber-600">Suppliers</button>
            <button onClick={() => setView("pricing")} className="hover:text-amber-600">Pricing</button>
            <button onClick={() => setView("how")} className="hover:text-amber-600">How it works</button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-2xl">Sign in</Button>
            <Button className="rounded-2xl bg-amber-500 hover:bg-amber-600 text-white">Get started</Button>
          </div>
        </div>
      </nav>

      {view === "home" && (
        <header className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Buy & sell electricals <span className="text-amber-600">smarter</span>
            </h1>
            <p className="mt-3 text-slate-600">
              Post requirements, get competitive bids in hours, secure payment via escrow, and track deliveries — all in one place.
            </p>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => setView("rfqs")} className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl">
                Explore live RFQs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setView("how")} className="rounded-2xl">How it works</Button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, label: "Escrow protected" },
                { icon: <Truck className="h-5 w-5" />, label: "Doorstep delivery" },
                { icon: <Star className="h-5 w-5" />, label: "Verified suppliers" },
              ].map((it, i) => (
                <Card key={i} className="rounded-2xl">
                  <CardContent className="flex gap-2 items-center p-3 text-sm">
                    {it.icon}
                    <span>{it.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5"/> Post a quick RFQ</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buyer">
                  <TabsList className="mb-3">
                    <TabsTrigger value="buyer">Buyer RFQ</TabsTrigger>
                    <TabsTrigger value="supplier">Supplier Sign‑up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="buyer">
                    <form onSubmit={submitRFQ} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Company" value={buyerForm.company} onChange={e=>setBuyerForm(v=>({...v, company:e.target.value}))}/>
                        <Input placeholder="Contact person" value={buyerForm.name} onChange={e=>setBuyerForm(v=>({...v, name:e.target.value}))}/>
                        <Input placeholder="Phone" value={buyerForm.phone} onChange={e=>setBuyerForm(v=>({...v, phone:e.target.value}))}/>
                        <Input placeholder="Email" value={buyerForm.email} onChange={e=>setBuyerForm(v=>({...v, email:e.target.value}))}/>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Category (LED / Cables / Switchgear)" value={buyerForm.category} onChange={e=>setBuyerForm(v=>({...v, category:e.target.value}))}/>
                        <Input placeholder="Approx. quantity" value={buyerForm.qty} onChange={e=>setBuyerForm(v=>({...v, qty:e.target.value}))}/>
                      </div>
                      <Input placeholder="Delivery location" value={buyerForm.location} onChange={e=>setBuyerForm(v=>({...v, location:e.target.value}))}/>
                      <Textarea placeholder="Item specs / brands / delivery date" value={buyerForm.items} onChange={e=>setBuyerForm(v=>({...v, items:e.target.value}))}/>

                      <div className="flex items-center gap-2">
                        <Switch checked={buyerForm.needEscrow} onCheckedChange={(v)=>setBuyerForm(f=>({...f, needEscrow:v}))} id="escrow"/>
                        <Label htmlFor="escrow" className="text-sm">Use escrow (recommended)</Label>
                        <Badge variant="secondary" className="ml-auto">No platform fee in beta</Badge>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50 border">
                        <div className="flex items-center gap-2 text-amber-700 font-medium"><Sparkles className="h-4 w-4"/> AI Suggestions</div>
                        <ul className="list-disc ml-5 mt-2 text-sm text-slate-700">
                          {aiHints?.map((h, i)=> (<li key={i}>{h}</li>))}
                        </ul>
                      </div>

                      <Button disabled={submitting} className="w-full bg-amber-500 hover:bg-amber-600 rounded-2xl">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin"/> : "Get bids now"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="supplier">
                    <form onSubmit={submitSupplier} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Business name" value={supplierForm.biz} onChange={e=>setSupplierForm(v=>({...v, biz:e.target.value}))}/>
                        <Input placeholder="Contact person" value={supplierForm.contact} onChange={e=>setSupplierForm(v=>({...v, contact:e.target.value}))}/>
                        <Input placeholder="Phone" value={supplierForm.phone} onChange={e=>setSupplierForm(v=>({...v, phone:e.target.value}))}/>
                        <Input placeholder="Email" value={supplierForm.email} onChange={e=>setSupplierForm(v=>({...v, email:e.target.value}))}/>
                        <Input placeholder="City" value={supplierForm.city} onChange={e=>setSupplierForm(v=>({...v, city:e.target.value}))}/>
                        <Input placeholder="GSTIN" value={supplierForm.gst} onChange={e=>setSupplierForm(v=>({...v, gst:e.target.value}))}/>
                      </div>
                      <Textarea placeholder="Products you supply (e.g., LED Panels, XLPE Cables, MCBs)" value={supplierForm.products} onChange={e=>setSupplierForm(v=>({...v, products:e.target.value}))}/>
                      <div className="flex items-center gap-2">
                        <Switch checked={supplierForm.wantsLeads} onCheckedChange={(v)=>setSupplierForm(f=>({...f, wantsLeads:v}))} id="leads"/>
                        <Label htmlFor="leads" className="text-sm">Send me verified buyer leads</Label>
                        <Badge className="ml-auto" variant="secondary">Free beta access</Badge>
                      </div>
                      <Button disabled={submitting} className="w-full rounded-2xl">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin"/> : "Create supplier account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </header>
      )}

      {view === "rfqs" && (
        <section className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5"/>
            <h2 className="text-2xl font-bold">Live RFQs</h2>
            <Badge className="ml-2">Beta</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {sampleRequirements.map((r) => (
              <Card key={r.id} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{r.title}</span>
                    <Badge variant="secondary">{r.created}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="text-slate-700">{r.details}</div>
                  <div className="flex items-center gap-2"><Building2 className="h-4 w-4"/> {r.location}</div>
                  <div className="flex items-center gap-2"><Wallet className="h-4 w-4"/> Budget: {r.budget}</div>
                  <div className="flex items-center gap-2"><ClipboardList className="h-4 w-4"/> Bids: {r.bids}</div>
                  <Button className="w-full mt-2 rounded-2xl" variant="outline">Place a bid</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {view === "suppliers" && (
        <section className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="h-5 w-5"/>
            <h2 className="text-2xl font-bold">Trusted suppliers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {supplierPool.map((s, i)=> (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{s.name}</span>
                    {s.verified ? (
                      <Badge className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Verified</Badge>
                    ) : (
                      <Badge variant="secondary">Unverified</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex items-center gap-2"><Building2 className="h-4 w-4"/> {s.city}</div>
                  <div className="flex items-center gap-2"><Star className="h-4 w-4"/> {s.rating}</div>
                  <div className="flex items-center gap-2"><Cable className="h-4 w-4"/> {s.tags.join(", ")}</div>
                  <div className="flex gap-2">
                    <Button className="rounded-2xl" size="sm">Request quote</Button>
                    <Button className="rounded-2xl" variant="outline" size="sm">View profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {view === "pricing" && (
        <section className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">Simple, fair pricing</h2>
            <p className="text-slate-600">Start free. Upgrade when you see value.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[{
              name: "Free",
              price: "₹0",
              features: ["Post RFQs", "5 bids/month", "Email alerts"],
            },{
              name: "Pro",
              price: "₹999/mo",
              features: ["Unlimited bids", "Verified badge", "Priority support", "Lead insights"],
              highlight: true,
            },{
              name: "Enterprise",
              price: "Talk to us",
              features: ["Private portal", "ERP integration", "Custom SLAs"],
            }].map((p, i)=> (
              <Card key={i} className={`rounded-2xl ${p.highlight ? 'border-amber-500 ring-2 ring-amber-100' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    <span>{p.name}</span>
                    {p.highlight && <Badge>Popular</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold">{p.price}</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {p.features.map((f, idx)=> (
                      <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/> {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 rounded-2xl">Choose {p.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {view === "how" && (
        <section className="max-w-6xl mx-auto p-6">
          <div className="grid md:grid-cols-5 gap-4 items-stretch">
            {[
              { icon: <FileText className="h-6 w-6"/>, title: "Post RFQ", desc: "Describe items, qty, location. AI helps refine specs." },
              { icon: <Factory className="h-6 w-6"/>, title: "Suppliers bid", desc: "Verified vendors respond with price & delivery." },
              { icon: <ShoppingCart className="h-6 w-6"/>, title: "Compare & award", desc: "Sort by price, rating, speed. Pick the best." },
              { icon: <ShieldCheck className="h-6 w-6"/>, title: "Escrow pay", desc: "Funds held safely until delivery is confirmed." },
              { icon: <Truck className="h-6 w-6"/>, title: "Delivery & rate", desc: "Track dispatch. Rate supplier; build credibility." },
            ].map((s, i)=> (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-amber-600">{s.icon}<span className="font-semibold">{s.title}</span></div>
                  <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Escrow protection</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>Your payment is released to the supplier only after you receive and accept the goods. Reduce bad‑debt risk and buy confidently from new vendors.</p>
                <div className="flex items-center gap-2"><Headphones className="h-4 w-4"/> Dispute assistance included in Pro & Enterprise plans.</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/> AI assist for specs</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <p>Upload a BOQ or type a brief — we auto‑extract quantities, suggest equivalent brands, and flag missing parameters (kA rating, IP, CRI, etc.).</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto p-6 text-sm text-slate-600 grid md:grid-cols-3 gap-3">
          <div>
            <div className="font-semibold">ElectraBid.ai</div>
            <p>India's smart B2B marketplace for electrical procurement.</p>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <p>support@electrabid.ai</p>
          </div>
          <div>
            <div className="font-semibold">Legal</div>
            <p>Terms • Privacy • Refund</p>
          </div>
        </div>
      </footer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600"/> {rfqId ? "RFQ submitted" : "Thank you!"}</DialogTitle>
            <DialogDescription>
              {rfqId ? (
                <div>
                  Your requirement has been shared with verified suppliers. Reference <b>{rfqId}</b>. You will start receiving bids shortly.
                </div>
              ) : (
                <div>
                  Your supplier profile request has been received. Our team will verify your details and enable leads in 24 hours.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={()=> setDialogOpen(false)} className="rounded-2xl">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
