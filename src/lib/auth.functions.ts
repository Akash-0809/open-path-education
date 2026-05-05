import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

// Server function for user sign-in
export const signInUser = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    try {
      const { email, password } = data;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!authData.session) {
        throw new Error("Failed to create session");
      }

      return {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          user_metadata: authData.user.user_metadata,
        },
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_in: authData.session.expires_in,
        },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Sign in failed");
    }
  });

// Server function for user sign-up
export const signUpUser = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string; full_name?: string }) => input)
  .handler(async ({ data }) => {
    try {
      const { email, password, full_name } = data;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: full_name || "",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        user: {
          id: authData.user?.id,
          email: authData.user?.email,
        },
        message: authData.user?.confirmed_at
          ? "Account created successfully!"
          : "Please check your email to confirm your account",
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Sign up failed");
    }
  });

// Server function for user sign-out
export const signOutUser = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sign out failed");
  }
});

// Server function to get current session
export const getCurrentSession = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    if (!session) {
      return {
        success: false,
        session: null,
        user: null,
      };
    }

    return {
      success: true,
      session: {
        access_token: session.access_token,
        expires_in: session.expires_in,
      },
      user: {
        id: session.user.id,
        email: session.user.email,
        user_metadata: session.user.user_metadata,
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to get session");
  }
});

// Server function to get current user
export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!user) {
      return {
        success: false,
        user: null,
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
        app_metadata: user.app_metadata,
      },
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to get user");
  }
});

// Server function to reset password
export const resetPassword = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    try {
      const { email } = data;

      if (!email) {
        throw new Error("Email is required");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.VITE_SUPABASE_URL}/auth/v1/callback`,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        message: "Password reset email sent. Please check your email.",
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Password reset failed");
    }
  });

// Server function to update user profile
export const updateUserProfile = createServerFn({ method: "POST" })
  .inputValidator((input: { full_name?: string; avatar_url?: string; phone?: string }) => input)
  .handler(async ({ data }) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const { data: updatedUser, error } = await supabase.auth.updateUser({
        data: data,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        user: {
          id: updatedUser.user.id,
          email: updatedUser.user.email,
          user_metadata: updatedUser.user.user_metadata,
        },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Profile update failed");
    }
  });
