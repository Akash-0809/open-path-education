import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface UseAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to manage authentication state and listen to auth changes
 * @returns Auth state and utilities
 */
export function useAuth() {
  const [state, setState] = useState<UseAuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  // Get initial auth state
  const getInitialAuth = useCallback(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setState({
        user: session?.user || null,
        session: session || null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        user: null,
        session: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Auth error"),
      });
    }
  }, []);

  // Subscribe to auth changes
  useEffect(() => {
    getInitialAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user || null,
        session: session || null,
        loading: false,
        error: null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getInitialAuth]);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Sign in failed");
      setState((prev) => ({ ...prev, error: err }));
      return { success: false, error: err };
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName || "" },
        },
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Sign up failed");
      setState((prev) => ({ ...prev, error: err }));
      return { success: false, error: err };
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Sign out failed");
      setState((prev) => ({ ...prev, error: err }));
      return { success: false, error: err };
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const isAuthenticated = !!state.user;

  return {
    ...state,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };
}
