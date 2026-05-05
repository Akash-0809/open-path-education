import { json } from "@tanstack/react-start";
import { signInUser } from "@/lib/auth.functions";

/**
 * POST /api/auth/sign-in
 * Sign in a user with email and password
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const result = await signInUser({ email, password });
    return json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sign in failed";
    return json({ success: false, error: message }, { status: 401 });
  }
}
