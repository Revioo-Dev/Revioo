export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };

      reviews: {
        Row: {
          id: string;
          user_id: string;
          reviewer_name: string;
          reviewer_email: string | null;
          platform: string;
          rating: number;
          text: string;
          responded: boolean;
          response_text: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          reviewer_name: string;
          reviewer_email?: string | null;
          platform?: string;
          rating: number;
          text: string;
          responded?: boolean;
          response_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          reviewer_name?: string;
          reviewer_email?: string | null;
          platform?: string;
          rating?: number;
          text?: string;
          responded?: boolean;
          response_text?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };

      admins: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };

      invite_codes: {
        Row: {
          id: string;
          code: string;
          plan: string | null;
          used: boolean;
          used_by: string | null;
          created_by: string | null;
          created_at: string;
          used_at: string | null;
        };
        Insert: {
          id?: string;
          code: string;
          plan?: string | null;
          used?: boolean;
          used_by?: string | null;
          created_by?: string | null;
          created_at?: string;
          used_at?: string | null;
        };
        Update: {
          id?: string;
          code?: string;
          plan?: string | null;
          used?: boolean;
          used_by?: string | null;
          created_by?: string | null;
          created_at?: string;
          used_at?: string | null;
        };
        Relationships: [];
      };

      businesses: {
        Row: Record<string, any>;
        Insert: Record<string, any>;
        Update: Record<string, any>;
        Relationships: [];
      };

      subscriptions: {
        Row: Record<string, any>;
        Insert: Record<string, any>;
        Update: Record<string, any>;
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];
