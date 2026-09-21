import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/hurriamo-mark.png.asset.json";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-content";

const links = [
  ["/house", "The House"], ["/services", "Services"], ["/portfolio", "Portfolio"],
  ["/process", "Process"], ["/director", "Director"], ["/contact", "Contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
    <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
      <Link to="/" aria-label="HURRIAMO home" className="flex items-center gap-3">
        <img src={logo.url} alt="" className="size-9 object-cover object-center" />
        <span className="font-display text-xl tracking-normal">HURRIAMO</span>
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
        {links.map(([to,label]) => <Link key={to} to={to} className={`text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-primary ${pathname===to ? "text-primary" : "text-muted-foreground"}`}>{label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild className="hidden rounded-none px-5 text-[11px] uppercase tracking-[0.16em] sm:inline-flex"><Link to="/appointment">Book an appointment</Link></Button>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
      </div>
    </div>
    {open && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
      <div className="grid gap-1">{links.map(([to,label]) => <Link key={to} to={to} onClick={()=>setOpen(false)} className="border-b border-border py-3 text-sm uppercase tracking-[0.14em]">{label}</Link>)}<Link to="/appointment" onClick={()=>setOpen(false)} className="mt-3 bg-primary px-4 py-3 text-center text-xs uppercase tracking-[0.14em] text-primary-foreground">Book an appointment</Link></div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-foreground text-background"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 md:grid-cols-3 md:px-10">
    <div><div className="font-display text-2xl">HURRIAMO</div><p className="mt-3 max-w-xs text-sm text-background/60">A private fashion house devoted to considered form and individual presence.</p></div>
    <div className="text-xs uppercase tracking-[0.16em]"><p className="mb-3 text-background/50">Private enquiries</p><a href={`mailto:${site.email}`} className="story-link">{site.email}</a></div>
    <div className="md:text-right"><Button asChild variant="outline" className="rounded-none border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/appointment">Request an appointment</Link></Button><p className="mt-5 text-xs text-background/45">© {new Date().getFullYear()} HURRIAMO</p></div>
  </div></footer>;
}

export function PageIntro({ eyebrow, title, text }: { eyebrow:string; title:string; text:string }) {
  return <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44"><p className="eyebrow">{eyebrow}</p><h1 className="mt-7 max-w-5xl font-display text-5xl leading-[0.98] md:text-8xl">{title}</h1><p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground md:ml-auto">{text}</p></section>;
}
