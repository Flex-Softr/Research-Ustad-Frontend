"use client";
import { useState, useEffect } from "react";
import type { InternationalConference } from "@/type/internationalConference";
import { GetAllInternationalConferencesPublic } from "@/services/internationalConferences";
import { InternationalConferenceGallery } from "@/components/module/internationalConferences/InternationalConferenceGallery";

const InternationalConferencesClient = () => {
  const [conferences, setConferences] = useState<InternationalConference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await GetAllInternationalConferencesPublic();
        
        if (response?.success && response?.data) {
          setConferences(response.data);
        } else {
          setConferences([]);
        }
      } catch (err) {
        console.error("Error fetching international conferences:", err);
        setError("Failed to load international conferences");
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  return (
    <div>
      <InternationalConferenceGallery 
        conferences={conferences} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default InternationalConferencesClient;
