
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
      banners: {
        Row: {
          id: string;
          title: string;
          image_url: string;
          link_url: string | null;
          expiry_date: string;
          created_at: string;
          updated_at: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          image_url: string;
          link_url?: string | null;
          expiry_date: string;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          image_url?: string;
          link_url?: string | null;
          expiry_date?: string;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          stock: number;
          seller: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          category: string;
          stock?: number;
          seller: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category?: string;
          stock?: number;
          seller?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer: string;
          total: number;
          status: string;
          payment: string;
          date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          customer: string;
          total: number;
          status: string;
          payment: string;
          date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer?: string;
          total?: number;
          status?: string;
          payment?: string;
          date?: string;
          created_at?: string;
          updated_at?: string;
        };
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
