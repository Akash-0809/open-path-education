import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Get user profile by user ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

/**
 * Create user profile
 */
export async function createUserProfile(
  userId: string,
  profile: Partial<UserProfile>,
): Promise<UserProfile> {
  try {
    const { data, error } = await supabase.from("profiles").insert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    return data?.[0] || null;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * Delete user profile
 */
export async function deleteUserProfile(userId: string): Promise<void> {
  try {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
}

/**
 * Check if user exists by email
 */
export async function userExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(limit = 50, offset = 0): Promise<UserProfile[]> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

/**
 * Search users by name or email
 */
export async function searchUsers(query: string, limit = 10): Promise<UserProfile[]> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}
