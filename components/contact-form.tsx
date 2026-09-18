"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  if (!WEB3FORMS_ACCESS_KEY) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm leading-6 text-slate-600">
          The contact form is not active yet — the site owner has not
          configured a public contact address. Please check back after
          launch.
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY!);
    formData.append("subject", "Seedha Hisab contact form message");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="font-bold text-emerald-900">Message sent.</p>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          Thank you — we read every message and will reply if a response is
          needed.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        <span>Your name</span>
        <Input
          name="name"
          required
          className="h-12 rounded-xl border-slate-300 bg-white text-base font-semibold"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        <span>Your email</span>
        <Input
          type="email"
          name="email"
          required
          className="h-12 rounded-xl border-slate-300 bg-white text-base font-semibold"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-slate-300 bg-white p-3 text-base font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          placeholder="Page URL, the input values you used, and the result you believe is wrong. Do not include passwords or sensitive account information."
        />
      </label>
      {/* Honeypot field to reduce basic spam bots; must stay hidden from real visitors */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <Button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start rounded-xl bg-[#102a43] px-5 py-3 font-bold text-white hover:bg-[#163b5e]"
      >
        {status === "sending" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
      {status === "error" && (
        <p className="text-sm font-semibold text-red-600">
          Something went wrong sending your message. Please try again in a
          moment.
        </p>
      )}
    </form>
  );
}
