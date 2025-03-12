export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
          updated_at: string
          published: boolean
          tags: string[]
          metadata: Json
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
          updated_at?: string
          published?: boolean
          tags?: string[]
          metadata?: Json
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          published?: boolean
          tags?: string[]
          metadata?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: 'draft' | 'published' | 'archived'
      user_role: 'admin' | 'user' | 'guest'
    }
  }
} 