export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          points: number | null
          requirements: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points?: number | null
          requirements?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points?: number | null
          requirements?: Json | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used_at: string | null
          name: string
          permissions: Json | null
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used_at?: string | null
          name: string
          permissions?: Json | null
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used_at?: string | null
          name?: string
          permissions?: Json | null
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_usage_logs: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          ip_address: string | null
          method: string
          response_time: number | null
          status_code: number | null
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: string | null
          method: string
          response_time?: number | null
          status_code?: number | null
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: string | null
          method?: string
          response_time?: number | null
          status_code?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          profile_id: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          profile_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"]
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          profile_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          created_at: string | null
          id: string
          profile_id: string
        }
        Insert: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          created_at?: string | null
          id?: string
          profile_id: string
        }
        Update: {
          badge_type?: Database["public"]["Enums"]["badge_type"]
          created_at?: string | null
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_attributes: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_attributes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      business_category_mappings: {
        Row: {
          business_id: string
          category_id: string
        }
        Insert: {
          business_id: string
          category_id: string
        }
        Update: {
          business_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_category_mappings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_category_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      business_promotions: {
        Row: {
          business_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          redemption_count: number | null
          start_date: string
          terms_conditions: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          redemption_count?: number | null
          start_date: string
          terms_conditions?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          redemption_count?: number | null
          start_date?: string
          terms_conditions?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_promotions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_qr_codes: {
        Row: {
          business_id: string
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          location_radius: number | null
          max_scans_per_day: number | null
          max_scans_per_user: number | null
          max_scans_per_user_per_day: number | null
          name: string
          points_multiplier: number | null
          qr_code_type: Database["public"]["Enums"]["qr_code_type"]
          qr_code_url: string
          requires_verification: boolean | null
          starts_at: string | null
          updated_at: string | null
          verification_method: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location_radius?: number | null
          max_scans_per_day?: number | null
          max_scans_per_user?: number | null
          max_scans_per_user_per_day?: number | null
          name: string
          points_multiplier?: number | null
          qr_code_type?: Database["public"]["Enums"]["qr_code_type"]
          qr_code_url: string
          requires_verification?: boolean | null
          starts_at?: string | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location_radius?: number | null
          max_scans_per_day?: number | null
          max_scans_per_user?: number | null
          max_scans_per_user_per_day?: number | null
          name?: string
          points_multiplier?: number | null
          qr_code_type?: Database["public"]["Enums"]["qr_code_type"]
          qr_code_url?: string
          requires_verification?: boolean | null
          starts_at?: string | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_qr_codes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_hours: Json | null
          contact_email: string | null
          contact_phone: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_claimed: boolean | null
          is_featured: boolean | null
          is_verified: boolean | null
          location: unknown | null
          logo_url: string | null
          menu_items: Json | null
          metadata: Json | null
          name: string
          operating_hours: Json | null
          place_type: Database["public"]["Enums"]["place_type"]
          profile_id: string | null
          qr_code_url: string | null
          search_document: unknown | null
          social_links: Json | null
          status: string | null
          tier: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_claimed?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          location?: unknown | null
          logo_url?: string | null
          menu_items?: Json | null
          metadata?: Json | null
          name: string
          operating_hours?: Json | null
          place_type: Database["public"]["Enums"]["place_type"]
          profile_id?: string | null
          qr_code_url?: string | null
          search_document?: unknown | null
          social_links?: Json | null
          status?: string | null
          tier?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_claimed?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          location?: unknown | null
          logo_url?: string | null
          menu_items?: Json | null
          metadata?: Json | null
          name?: string
          operating_hours?: Json | null
          place_type?: Database["public"]["Enums"]["place_type"]
          profile_id?: string | null
          qr_code_url?: string | null
          search_document?: unknown | null
          social_links?: Json | null
          status?: string | null
          tier?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          completed_at: string | null
          joined_at: string | null
          profile_id: string
          progress: Json | null
          rewards_claimed: boolean | null
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          joined_at?: string | null
          profile_id: string
          progress?: Json | null
          rewards_claimed?: boolean | null
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          joined_at?: string | null
          profile_id?: string
          progress?: Json | null
          rewards_claimed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          requirements: Json | null
          rewards: Json | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          requirements?: Json | null
          rewards?: Json | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          requirements?: Json | null
          rewards?: Json | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          added_at: string | null
          collection_id: string
          post_id: string
        }
        Insert: {
          added_at?: string | null
          collection_id: string
          post_id: string
        }
        Update: {
          added_at?: string | null
          collection_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "content_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      comment_likes: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          profile_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          profile_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          post_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      content_collections: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_collections_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_moderation: {
        Row: {
          automated: boolean | null
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          moderation_history: Json | null
          notes: string | null
          reason: Database["public"]["Enums"]["moderation_reason"] | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["moderation_status"]
          updated_at: string | null
        }
        Insert: {
          automated?: boolean | null
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          moderation_history?: Json | null
          notes?: string | null
          reason?: Database["public"]["Enums"]["moderation_reason"] | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string | null
        }
        Update: {
          automated?: boolean | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          moderation_history?: Json | null
          notes?: string | null
          reason?: Database["public"]["Enums"]["moderation_reason"] | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["moderation_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_moderation_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_templates: {
        Row: {
          business_id: string | null
          content: string | null
          created_at: string | null
          id: string
          media_urls: string[] | null
          name: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          name: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          name?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          content: string | null
          created_at: string | null
          edited_by: string | null
          id: string
          media_urls: string[] | null
          post_id: string | null
          version_number: number
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          edited_by?: string | null
          id?: string
          media_urls?: string[] | null
          post_id?: string | null
          version_number: number
        }
        Update: {
          content?: string | null
          created_at?: string | null
          edited_by?: string | null
          id?: string
          media_urls?: string[] | null
          post_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_edited_by_fkey"
            columns: ["edited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      conversion_tracking: {
        Row: {
          action_type: string
          business_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          profile_id: string | null
        }
        Insert: {
          action_type: string
          business_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string | null
        }
        Update: {
          action_type?: string
          business_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversion_tracking_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversion_tracking_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      engagement_metrics: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          metrics: Json
          period_end: string
          period_start: string
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          metrics: Json
          period_end: string
          period_start: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          metrics?: Json
          period_end?: string
          period_start?: string
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          profile_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          profile_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          profile_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          business_id: string | null
          cover_image_url: string | null
          created_at: string | null
          creator_id: string
          description: string | null
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          is_featured: boolean | null
          location: unknown | null
          max_attendees: number | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          is_featured?: boolean | null
          location?: unknown | null
          max_attendees?: number | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          end_time?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          is_featured?: boolean | null
          location?: unknown | null
          max_attendees?: number | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_request_votes: {
        Row: {
          created_at: string | null
          feature_request_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          feature_request_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          feature_request_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_request_votes_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_request_votes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_requests: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          profile_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtags: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      list_items: {
        Row: {
          created_at: string | null
          id: string
          list_id: string
          post_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          list_id: string
          post_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          list_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_items_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      lists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lists_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_favorites: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          place_id: string | null
          profile_id: string
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          place_id?: string | null
          profile_id: string
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          place_id?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_favorites_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_favorites_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_reviews: {
        Row: {
          business_id: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          photos: string[] | null
          place_id: string | null
          profile_id: string
          rating: number | null
          review_text: string | null
          updated_at: string | null
          visit_date: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          photos?: string[] | null
          place_id?: string | null
          profile_id: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          visit_date?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          photos?: string[] | null
          place_id?: string | null
          profile_id?: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_reviews_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          profile_id: string
          title: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          profile_id: string
          title: string
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          profile_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_preferences: {
        Row: {
          created_at: string | null
          id: string
          interests: string[]
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interests: string[]
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interests?: string[]
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          best_times: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          facilities: Json | null
          id: string
          location: unknown | null
          name: string
          place_type: Database["public"]["Enums"]["place_type"]
          safety_info: string | null
          search_document: unknown | null
          updated_at: string | null
        }
        Insert: {
          best_times?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          facilities?: Json | null
          id?: string
          location?: unknown | null
          name: string
          place_type: Database["public"]["Enums"]["place_type"]
          safety_info?: string | null
          search_document?: unknown | null
          updated_at?: string | null
        }
        Update: {
          best_times?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          facilities?: Json | null
          id?: string
          location?: unknown | null
          name?: string
          place_type?: Database["public"]["Enums"]["place_type"]
          safety_info?: string | null
          search_document?: unknown | null
          updated_at?: string | null
        }
        Relationships: []
      }
      points: {
        Row: {
          amount: number
          created_at: string | null
          expires_at: string | null
          id: string
          profile_id: string
          reason: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          profile_id: string
          reason: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          expires_at?: string | null
          id?: string
          profile_id?: string
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_hashtags: {
        Row: {
          created_at: string | null
          hashtag_id: string
          post_id: string
        }
        Insert: {
          created_at?: string | null
          hashtag_id: string
          post_id: string
        }
        Update: {
          created_at?: string | null
          hashtag_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_hashtags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_hashtags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          business_id: string | null
          content: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_media_processed: boolean | null
          is_pinned: boolean | null
          is_private: boolean | null
          location: unknown | null
          media_urls: string[]
          original_platform:
            | Database["public"]["Enums"]["social_platform"]
            | null
          place_id: string | null
          platform_post_id: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          rating: number | null
          storage_path: string[] | null
          sync_status: string | null
          thumbnail_url: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_media_processed?: boolean | null
          is_pinned?: boolean | null
          is_private?: boolean | null
          location?: unknown | null
          media_urls: string[]
          original_platform?:
            | Database["public"]["Enums"]["social_platform"]
            | null
          place_id?: string | null
          platform_post_id?: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          rating?: number | null
          storage_path?: string[] | null
          sync_status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_media_processed?: boolean | null
          is_pinned?: boolean | null
          is_private?: boolean | null
          location?: unknown | null
          media_urls?: string[]
          original_platform?:
            | Database["public"]["Enums"]["social_platform"]
            | null
          place_id?: string | null
          platform_post_id?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          rating?: number | null
          storage_path?: string[] | null
          sync_status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_business_verified: boolean | null
          last_active_at: string | null
          location: unknown | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          phone: string | null
          preferred_hashtags: string[] | null
          social_sync_preferences: Json | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_business_verified?: boolean | null
          last_active_at?: string | null
          location?: unknown | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferred_hashtags?: string[] | null
          social_sync_preferences?: Json | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_business_verified?: boolean | null
          last_active_at?: string | null
          location?: unknown | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preferred_hashtags?: string[] | null
          social_sync_preferences?: Json | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          username?: string
        }
        Relationships: []
      }
      qr_code_promotions: {
        Row: {
          cooldown_period: unknown | null
          created_at: string | null
          description: string | null
          discount_amount: number | null
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          excluded_days: number[] | null
          excluded_hours: Json | null
          excluded_items: Json | null
          expires_at: string
          id: string
          is_active: boolean | null
          max_discount_amount: number | null
          max_redemptions: number | null
          max_redemptions_per_user: number | null
          min_purchase_amount: number | null
          promo_type: Database["public"]["Enums"]["promo_type"]
          qr_code_id: string
          redemptions_count: number | null
          requires_auth: boolean | null
          requires_purchase_verification: boolean | null
          requires_staff_approval: boolean | null
          starts_at: string
          terms_conditions: string | null
          title: string
          updated_at: string | null
          verification_code: string | null
        }
        Insert: {
          cooldown_period?: unknown | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          excluded_days?: number[] | null
          excluded_hours?: Json | null
          excluded_items?: Json | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          max_redemptions?: number | null
          max_redemptions_per_user?: number | null
          min_purchase_amount?: number | null
          promo_type: Database["public"]["Enums"]["promo_type"]
          qr_code_id: string
          redemptions_count?: number | null
          requires_auth?: boolean | null
          requires_purchase_verification?: boolean | null
          requires_staff_approval?: boolean | null
          starts_at: string
          terms_conditions?: string | null
          title: string
          updated_at?: string | null
          verification_code?: string | null
        }
        Update: {
          cooldown_period?: unknown | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          excluded_days?: number[] | null
          excluded_hours?: Json | null
          excluded_items?: Json | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          max_redemptions?: number | null
          max_redemptions_per_user?: number | null
          min_purchase_amount?: number | null
          promo_type?: Database["public"]["Enums"]["promo_type"]
          qr_code_id?: string
          redemptions_count?: number | null
          requires_auth?: boolean | null
          requires_purchase_verification?: boolean | null
          requires_staff_approval?: boolean | null
          starts_at?: string
          terms_conditions?: string | null
          title?: string
          updated_at?: string | null
          verification_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_code_promotions_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "business_qr_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_code_redemptions: {
        Row: {
          created_at: string | null
          device_id: string | null
          discount_applied: number | null
          id: string
          ip_address: string | null
          location: unknown | null
          metadata: Json | null
          profile_id: string
          promotion_id: string
          purchase_amount: number | null
          redeemed_at: string
          rejection_reason: string | null
          scan_id: string
          status: Database["public"]["Enums"]["redemption_status"]
          verification_code: string | null
          verification_method: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          discount_applied?: number | null
          id?: string
          ip_address?: string | null
          location?: unknown | null
          metadata?: Json | null
          profile_id: string
          promotion_id: string
          purchase_amount?: number | null
          redeemed_at?: string
          rejection_reason?: string | null
          scan_id: string
          status?: Database["public"]["Enums"]["redemption_status"]
          verification_code?: string | null
          verification_method?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          discount_applied?: number | null
          id?: string
          ip_address?: string | null
          location?: unknown | null
          metadata?: Json | null
          profile_id?: string
          promotion_id?: string
          purchase_amount?: number | null
          redeemed_at?: string
          rejection_reason?: string | null
          scan_id?: string
          status?: Database["public"]["Enums"]["redemption_status"]
          verification_code?: string | null
          verification_method?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_code_redemptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_code_redemptions_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "qr_code_promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_code_redemptions_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "qr_code_scans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_code_redemptions_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_code_scans: {
        Row: {
          business_id: string
          created_at: string | null
          device_id: string | null
          id: string
          ip_address: string | null
          is_suspicious: boolean | null
          location: unknown | null
          metadata: Json | null
          points_awarded: number
          profile_id: string
          qr_code_id: string
          scanned_at: string
          suspicious_reason: string | null
          user_agent: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          is_suspicious?: boolean | null
          location?: unknown | null
          metadata?: Json | null
          points_awarded: number
          profile_id: string
          qr_code_id: string
          scanned_at?: string
          suspicious_reason?: string | null
          user_agent?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          is_suspicious?: boolean | null
          location?: unknown | null
          metadata?: Json | null
          points_awarded?: number
          profile_id?: string
          qr_code_id?: string
          scanned_at?: string
          suspicious_reason?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_code_scans_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_code_scans_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_code_scans_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "business_qr_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_scans: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          points_awarded: number
          profile_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          points_awarded: number
          profile_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          points_awarded?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_scans_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_scans_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      redemption_verification_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          is_used: boolean | null
          promotion_id: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          is_used?: boolean | null
          promotion_id: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          is_used?: boolean | null
          promotion_id?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redemption_verification_codes_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "qr_code_promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemption_verification_codes_used_by_fkey"
            columns: ["used_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          comment_id: string | null
          created_at: string | null
          description: string | null
          id: string
          post_id: string | null
          profile_id: string | null
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          post_id?: string | null
          profile_id?: string | null
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          post_id?: string | null
          profile_id?: string | null
          report_type?: Database["public"]["Enums"]["report_type"]
          reporter_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string | null
          filters: Json | null
          id: string
          name: string | null
          profile_id: string | null
          query: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          name?: string | null
          profile_id?: string | null
          query: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          name?: string | null
          profile_id?: string | null
          query?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          business_id: string | null
          content: string | null
          created_at: string | null
          id: string
          media_urls: string[] | null
          place_id: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          profile_id: string
          scheduled_for: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          place_id?: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          profile_id: string
          scheduled_for: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          place_id?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          profile_id?: string
          scheduled_for?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_posts_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_posts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_logs: {
        Row: {
          created_at: string | null
          filters: Json | null
          id: string
          location: unknown | null
          profile_id: string | null
          query: string
          result_count: number | null
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          location?: unknown | null
          profile_id?: string | null
          query: string
          result_count?: number | null
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          location?: unknown | null
          profile_id?: string | null
          query?: string
          result_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "search_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_logs: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          ip_address: string | null
          login_at: string
          logout_at: string | null
          profile_id: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          login_at: string
          logout_at?: string | null
          profile_id?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          login_at?: string
          logout_at?: string | null
          profile_id?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shares: {
        Row: {
          created_at: string | null
          id: string
          list_id: string | null
          platform: Database["public"]["Enums"]["share_platform"]
          post_id: string | null
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          platform: Database["public"]["Enums"]["share_platform"]
          post_id?: string | null
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          list_id?: string | null
          platform?: Database["public"]["Enums"]["share_platform"]
          post_id?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shares_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shares_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shares_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "shares_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          platform: Database["public"]["Enums"]["social_platform"]
          platform_user_id: string
          profile_id: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: Database["public"]["Enums"]["social_platform"]
          platform_user_id: string
          profile_id: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["social_platform"]
          platform_user_id?: string
          profile_id?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      suspicious_activities: {
        Row: {
          activity_type: string
          business_id: string | null
          created_at: string | null
          details: Json | null
          device_id: string | null
          id: string
          ip_address: string | null
          location: unknown | null
          profile_id: string
        }
        Insert: {
          activity_type: string
          business_id?: string | null
          created_at?: string | null
          details?: Json | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          location?: unknown | null
          profile_id: string
        }
        Update: {
          activity_type?: string
          business_id?: string | null
          created_at?: string | null
          details?: Json | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          location?: unknown | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suspicious_activities_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suspicious_activities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achieved_at: string | null
          achievement_id: string
          profile_id: string
        }
        Insert: {
          achieved_at?: string | null
          achievement_id: string
          profile_id: string
        }
        Update: {
          achieved_at?: string | null
          achievement_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          created_at: string | null
          device_id: string
          device_type: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          metadata: Json | null
          profile_id: string | null
          push_token: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          device_type?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          metadata?: Json | null
          profile_id?: string | null
          push_token?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          device_type?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          metadata?: Json | null
          profile_id?: string | null
          push_token?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          profile_id: string | null
          rating: number | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          rating?: number | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mentions: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          mentioned_profile_id: string
          mentioner_profile_id: string
          post_id: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          mentioned_profile_id: string
          mentioner_profile_id: string
          post_id?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          mentioned_profile_id?: string
          mentioner_profile_id?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_mentions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_mentioned_profile_id_fkey"
            columns: ["mentioned_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_mentioner_profile_id_fkey"
            columns: ["mentioner_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          language: string | null
          notification_settings: Json | null
          privacy_settings: Json | null
          profile_id: string
          theme: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          language?: string | null
          notification_settings?: Json | null
          privacy_settings?: Json | null
          profile_id: string
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          language?: string | null
          notification_settings?: Json | null
          privacy_settings?: Json | null
          profile_id?: string
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tags: {
        Row: {
          created_at: string | null
          id: string
          position: Json | null
          post_id: string
          tagged_profile_id: string
          tagger_profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          position?: Json | null
          post_id: string
          tagged_profile_id: string
          tagger_profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          position?: Json | null
          post_id?: string
          tagged_profile_id?: string
          tagger_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "user_posts_for_upload"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "user_tags_tagged_profile_id_fkey"
            columns: ["tagged_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_tagger_profile_id_fkey"
            columns: ["tagger_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      view_logs: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          device_info: Json | null
          id: string
          location: unknown | null
          profile_id: string | null
          view_duration: unknown | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          device_info?: Json | null
          id?: string
          location?: unknown | null
          profile_id?: string | null
          view_duration?: unknown | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          device_info?: Json | null
          id?: string
          location?: unknown | null
          profile_id?: string | null
          view_duration?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "view_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_subscriptions: {
        Row: {
          created_at: string | null
          events: string[]
          failure_count: number | null
          id: string
          is_active: boolean | null
          last_triggered_at: string | null
          profile_id: string
          secret_hash: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          events: string[]
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          profile_id: string
          secret_hash?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          events?: string[]
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          profile_id?: string
          secret_hash?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      location_search: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          entity_type: string | null
          id: string | null
          is_claimed: boolean | null
          is_featured: boolean | null
          is_verified: boolean | null
          location: unknown | null
          metadata: Json | null
          name: string | null
          place_type: Database["public"]["Enums"]["place_type"] | null
          search_document: unknown | null
          status: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      user_posts_for_upload: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          is_media_processed: boolean | null
          post_id: string | null
          post_type: Database["public"]["Enums"]["post_type"] | null
          storage_path: string[] | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          is_media_processed?: boolean | null
          post_id?: string | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          storage_path?: string[] | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          is_media_processed?: boolean | null
          post_id?: string | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          storage_path?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: {
          oldname: string
          newname: string
          version: string
        }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: {
          tbl: unknown
          col: string
        }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: {
          tbl: unknown
          att_name: string
          geom: unknown
          mode?: string
        }
        Returns: number
      }
      _st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      _st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_intersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      _st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      _st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: {
          geom: unknown
        }
        Returns: number
      }
      _st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      addauth: {
        Args: {
          "": string
        }
        Returns: boolean
      }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
      append_post_storage_file: {
        Args: {
          post_id: string
          file_path: string
        }
        Returns: undefined
      }
      are_points_expired: {
        Args: {
          expires_at: string
        }
        Returns: boolean
      }
      award_achievement: {
        Args: {
          profile_uuid: string
          achievement_name: string
        }
        Returns: undefined
      }
      box:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box3d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3dtobox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bytea:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      calculate_engagement_metrics: {
        Args: {
          entity_type: string
          entity_id: string
          start_time: string
          end_time: string
        }
        Returns: Json
      }
      check_achievement: {
        Args: {
          profile_uuid: string
          achievement_name: string
        }
        Returns: boolean
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      does_follow: {
        Args: {
          follower_uuid: string
          following_uuid: string
        }
        Returns: boolean
      }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
            }
            Returns: string
          }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
            }
            Returns: string
          }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geography:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geography_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geography_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geometry_above: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geometry_below: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_cmp: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_contained_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_eq: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_ge: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_gt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      geometry_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_le: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_left: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_lt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_overabove: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overleft: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overright: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_right: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geometry_sortsupport: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geometry_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometrytype:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      get_active_points: {
        Args: {
          profile_uuid: string
        }
        Returns: number
      }
      get_expired_points: {
        Args: {
          profile_uuid: string
        }
        Returns: number
      }
      get_follower_count: {
        Args: {
          profile_uuid: string
        }
        Returns: number
      }
      get_following_count: {
        Args: {
          profile_uuid: string
        }
        Returns: number
      }
      get_post_files: {
        Args: {
          post_id: string
        }
        Returns: {
          file_path: string
          file_size: number
          mime_type: string
          created_at: string
        }[]
      }
      get_post_stats: {
        Args: {
          post_uuid: string
        }
        Returns: Json
      }
      get_post_upload_path: {
        Args: {
          post_id: string
          file_name: string
        }
        Returns: string
      }
      get_proj4_from_srid: {
        Args: {
          "": number
        }
        Returns: string
      }
      get_recent_activity: {
        Args: {
          profile_uuid: string
          limit_val?: number
        }
        Returns: {
          activity_type: string
          activity_data: Json
          created_at: string
        }[]
      }
      get_total_points: {
        Args: {
          profile_uuid: string
        }
        Returns: number
      }
      get_user_stats: {
        Args: {
          profile_uuid: string
        }
        Returns: Json
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gidx_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      has_completed_onboarding: {
        Args: {
          profile_uuid: string
        }
        Returns: boolean
      }
      increment_post_comment_count: {
        Args: {
          post_uuid: string
        }
        Returns: undefined
      }
      is_business_claimed: {
        Args: {
          business_uuid: string
        }
        Returns: boolean
      }
      is_post_owner: {
        Args: {
          post_id: string
          user_id: string
        }
        Returns: boolean
      }
      json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      log_action: {
        Args: {
          profile_uuid: string
          action: Database["public"]["Enums"]["action_type"]
          entity_type: string
          entity_id: string
          metadata?: Json
          ip_address?: string
          user_agent?: string
        }
        Returns: undefined
      }
      log_view: {
        Args: {
          profile_uuid: string
          content_type: string
          content_id: string
          view_duration?: unknown
          device_info?: Json
          location?: unknown
        }
        Returns: undefined
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      point: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      polygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      populate_geometry_columns:
        | {
            Args: {
              tbl_oid: unknown
              use_typmod?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              use_typmod?: boolean
            }
            Returns: string
          }
      postgis_addbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_type: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: string
      }
      postgis_dropbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_type: {
        Args: {
          "": number
        }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search_hashtags: {
        Args: {
          search_query: string
          result_limit?: number
        }
        Returns: {
          tag: string
          post_count: number
        }[]
      }
      search_locations: {
        Args: {
          search_query: string
          filter_types?: string[]
          current_location?: unknown
          max_distance_meters?: number
          limit_val?: number
          offset_val?: number
        }
        Returns: Database["public"]["CompositeTypes"]["location_search_result"][]
      }
      spheroid_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      spheroid_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3ddistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_3dlength: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dlongestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dperimeter: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dshortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_addpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_angle:
        | {
            Args: {
              line1: unknown
              line2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              pt1: unknown
              pt2: unknown
              pt3: unknown
              pt4?: unknown
            }
            Returns: number
          }
      st_area:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_area2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_asbinary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asencodedpolyline: {
        Args: {
          geom: unknown
          nprecision?: number
        }
        Returns: string
      }
      st_asewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_asewkt:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asgeojson:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
            Returns: string
          }
      st_asgml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
      st_ashexewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_askml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
      st_aslatlontext: {
        Args: {
          geom: unknown
          tmpl?: string
        }
        Returns: string
      }
      st_asmarc21: {
        Args: {
          geom: unknown
          format?: string
        }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
      st_astext:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_astwkb:
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: {
          geom: unknown
          maxdecimaldigits?: number
          options?: number
        }
        Returns: string
      }
      st_azimuth:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_boundary: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: {
          geom: unknown
          fits?: boolean
        }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: {
              geom: unknown
              radius: number
              options?: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              radius: number
              quadsegs: number
            }
            Returns: unknown
          }
      st_buildarea: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_centroid:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      st_cleangeometry: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: {
          geom: unknown
          box: unknown
        }
        Returns: unknown
      }
      st_closestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: {
          "": unknown[]
        }
        Returns: unknown[]
      }
      st_collect:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_collectionextract: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_convexhull: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_coorddim: {
        Args: {
          geometry: unknown
        }
        Returns: number
      }
      st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_curvetoline: {
        Args: {
          geom: unknown
          tol?: number
          toltype?: number
          flags?: number
        }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: {
          g1: unknown
          tolerance?: number
          flags?: number
        }
        Returns: unknown
      }
      st_difference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_dimension: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_disjoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_distance:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_distancesphere:
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              radius: number
            }
            Returns: number
          }
      st_distancespheroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_dump: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_envelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_expand:
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
            }
            Returns: unknown
          }
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
              dz?: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              dx: number
              dy: number
              dz?: number
              dm?: number
            }
            Returns: unknown
          }
      st_exteriorring: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force3d: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force3dm: {
        Args: {
          geom: unknown
          mvalue?: number
        }
        Returns: unknown
      }
      st_force3dz: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force4d: {
        Args: {
          geom: unknown
          zvalue?: number
          mvalue?: number
        }
        Returns: unknown
      }
      st_forcecollection: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcecurve: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcerhr: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcesfs: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_generatepoints:
        | {
            Args: {
              area: unknown
              npoints: number
            }
            Returns: unknown
          }
        | {
            Args: {
              area: unknown
              npoints: number
              seed: number
            }
            Returns: unknown
          }
      st_geogfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geohash:
        | {
            Args: {
              geog: unknown
              maxchars?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxchars?: number
            }
            Returns: string
          }
      st_geomcollfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometrytype: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromgeojson:
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
      st_geomfromgml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: {
          marc21xml: string
        }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_gmltosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_hasarc: {
        Args: {
          geometry: unknown
        }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_hexagon: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: {
          line: unknown
          point: unknown
        }
        Returns: number
      }
      st_intersection: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_intersects:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_isclosed: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_iscollection: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isempty: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isring: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_issimple: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvalid: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: {
          geom: unknown
          flags?: number
        }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_length:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_length2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_letters: {
        Args: {
          letters: string
          font?: Json
        }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: {
          txtin: string
          nprecision?: number
        }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_linemerge: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linetocurve: {
        Args: {
          geometry: unknown
        }
        Returns: unknown
      }
      st_locatealong: {
        Args: {
          geometry: unknown
          measure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: {
          geometry: unknown
          fromelevation: number
          toelevation: number
        }
        Returns: unknown
      }
      st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_m: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_makebox2d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_makeline:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_makepolygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_makevalid:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              params: string
            }
            Returns: unknown
          }
      st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: {
          inputgeom: unknown
          segs_per_quarter?: number
        }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multi: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_ndims: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_node: {
        Args: {
          g: unknown
        }
        Returns: unknown
      }
      st_normalize: {
        Args: {
          geom: unknown
        }
        Returns: unknown
      }
      st_npoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_nrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numgeometries: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorring: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpatches: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_offsetcurve: {
        Args: {
          line: unknown
          distance: number
          params?: string
        }
        Returns: unknown
      }
      st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_perimeter:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_perimeter2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_pointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_points: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonize: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      st_project: {
        Args: {
          geog: unknown
          distance: number
          azimuth: number
        }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: {
          geom: unknown
          gridsize: number
        }
        Returns: unknown
      }
      st_relate: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: {
          geom: unknown
          tolerance?: number
        }
        Returns: unknown
      }
      st_reverse: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_segmentize: {
        Args: {
          geog: unknown
          max_segment_length: number
        }
        Returns: unknown
      }
      st_setsrid:
        | {
            Args: {
              geog: unknown
              srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              srid: number
            }
            Returns: unknown
          }
      st_sharedpaths: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_shortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: {
          geom: unknown
          vertex_fraction: number
          is_outer?: boolean
        }
        Returns: unknown
      }
      st_split: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_square: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_squaregrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | {
            Args: {
              geog: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom: unknown
            }
            Returns: number
          }
      st_startpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_subdivide: {
        Args: {
          geom: unknown
          maxvertices?: number
          gridsize?: number
        }
        Returns: unknown[]
      }
      st_summary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_swapordinates: {
        Args: {
          geom: unknown
          ords: unknown
        }
        Returns: unknown
      }
      st_symdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_transform:
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_proj: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              to_proj: string
            }
            Returns: unknown
          }
      st_triangulatepolygon: {
        Args: {
          g1: unknown
        }
        Returns: unknown
      }
      st_union:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              gridsize: number
            }
            Returns: unknown
          }
      st_voronoilines: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: {
          wkb: string
        }
        Returns: unknown
      }
      st_wkttosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_wrapx: {
        Args: {
          geom: unknown
          wrap: number
          move: number
        }
        Returns: unknown
      }
      st_x: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_y: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_z: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmflag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      unlockrows: {
        Args: {
          "": string
        }
        Returns: number
      }
      update_challenge_progress: {
        Args: {
          profile_uuid: string
          challenge_uuid: string
        }
        Returns: undefined
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      action_type:
        | "create"
        | "update"
        | "delete"
        | "like"
        | "unlike"
        | "follow"
        | "unfollow"
        | "comment"
        | "delete_comment"
        | "share"
        | "save"
        | "unsave"
        | "view"
        | "scan_qr"
        | "claim_business"
        | "verify_business"
        | "report"
        | "attend_event"
      badge_type: "verified" | "featured" | "top_rated"
      discount_type: "percentage" | "fixed_amount"
      event_type: "business" | "community"
      moderation_reason:
        | "inappropriate"
        | "spam"
        | "offensive"
        | "copyright"
        | "other"
      moderation_status:
        | "pending"
        | "approved"
        | "rejected"
        | "flagged"
        | "under_review"
      place_type: "restaurant" | "beach" | "trail" | "market" | "other"
      post_type: "photo" | "video"
      promo_type: "discount" | "freebie" | "bogo" | "points_boost"
      qr_code_type: "default" | "promo" | "event" | "loyalty" | "menu"
      redemption_status: "pending" | "approved" | "rejected" | "expired"
      report_type: "inappropriate" | "spam" | "offensive" | "other"
      share_platform: "whatsapp" | "messenger" | "instagram_stories" | "sms"
      social_platform: "instagram" | "tiktok"
      user_type: "personal" | "business"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      location_search_result: {
        id: string | null
        entity_type: string | null
        name: string | null
        description: string | null
        place_type: Database["public"]["Enums"]["place_type"] | null
        location: unknown | null
        cover_image_url: string | null
        search_document: unknown | null
        is_claimed: boolean | null
        is_verified: boolean | null
        is_featured: boolean | null
        status: string | null
        created_at: string | null
        updated_at: string | null
        metadata: Json | null
        distance: number | null
        search_rank: number | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

