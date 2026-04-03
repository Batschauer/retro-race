import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen">
      <div className="hud-glass px-4 py-3">
        <Link
          href="/"
          className="label-md text-tertiary hover:text-secondary focus-visible:ghost-outline"
        >
          &gt; VOLTAR_AO_SITE
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
