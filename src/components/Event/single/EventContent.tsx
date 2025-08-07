import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { CustomEvent } from "@/type/event";

interface EventContentProps {
  event: CustomEvent;
}

const EventContent = ({ event }: EventContentProps) => {


  // Use agenda from database if available, otherwise generate dynamic agenda
  const getAgenda = (event: CustomEvent) => {
    if (event.agenda && event.agenda.trim()) {
      // Return the agenda from database
      return event.agenda;
    }

    console.log('Event data for dynamic agenda:', event);
    
    // Generate dynamic agenda based on actual event data
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const daysDiff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate event duration in hours
    const durationHours = Math.ceil(event.eventDuration / 60);
    
    // Generate dynamic sessions based on event data
    const generateSessions = (isFirstDay: boolean, isLastDay: boolean, dayIndex: number) => {
      const sessions = [];
      
      if (isFirstDay) {
        sessions.push({
          title: "Opening Ceremony & Welcome",
          time: "9:00 AM",
          duration: "30 min"
        });
      }
      
      // Add keynote sessions if speakers exist
      if (event.speakers && event.speakers.length > 0) {
        event.speakers.forEach((speaker, index) => {
          sessions.push({
            title: `Keynote: ${speaker.name}`,
            time: isFirstDay ? `${9 + index * 2}:00 AM` : `${9 + index}:00 AM`,
            duration: "45 min",
            speaker: speaker.name
          });
        });
      } else {
        sessions.push({
          title: "Keynote Speeches",
          time: isFirstDay ? "10:00 AM" : "9:00 AM",
          duration: "45 min"
        });
      }
      
      // Add panel discussions
      sessions.push({
        title: "Panel Discussions",
        time: isFirstDay ? "11:30 AM" : "10:30 AM",
        duration: "60 min"
      });
      
      // Add networking break
      sessions.push({
        title: "Networking Break",
        time: isFirstDay ? "12:30 PM" : "11:30 AM",
        duration: "30 min"
      });
      
      // Add workshop sessions based on event category
      const workshopTitle = event.category ? `${event.category} Workshop` : "Workshop Sessions";
      sessions.push({
        title: workshopTitle,
        time: isFirstDay ? "1:00 PM" : "12:00 PM",
        duration: "90 min"
      });
      
      if (isLastDay) {
        sessions.push({
          title: "Closing Ceremony & Awards",
          time: "3:00 PM",
          duration: "60 min"
        });
      } else {
        sessions.push({
          title: "Evening Session",
          time: "2:30 PM",
          duration: "60 min"
        });
      }
      
      return sessions;
    };

    if (daysDiff === 0) {
      // Single day event
      const sessions = generateSessions(true, true, 0);
      
             return `
         <div style="margin-bottom: 1.5rem;">
           <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Event Schedule</h2>
           <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
             <p style="font-size: 0.875rem; color: #1e40af;">
               <strong>Event Duration:</strong> ${event.eventDuration} minutes | 
               <strong>Location:</strong> ${event.location} | 
               <strong>Category:</strong> ${event.category}
             </p>
           </div>
           
           <div style="background-color: #f9fafb; border-radius: 0.5rem; padding: 1.5rem;">
             <h3 style="font-size: 1.125rem; font-weight: 500; color: #374151; margin-bottom: 0.75rem;">Event Day</h3>
             <ul style="margin: 0; padding: 0; list-style: none;">
               ${sessions.map(session => `
                 <li style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 0.75rem;">
                   <div style="display: flex; align-items: center;">
                     <span style="width: 0.5rem; height: 0.5rem; background-color: #bc986b; border-radius: 50%; margin-right: 0.75rem;"></span>
                     <div>
                       <span style="font-weight: 500; color: #111827;">${session.title}</span>
                       ${session.speaker ? `<br><span style="font-size: 0.875rem; color: #6b7280;">by ${session.speaker}</span>` : ''}
                     </div>
                   </div>
                   <div style="text-align: right;">
                     <span style="color: #6b7280; font-size: 0.875rem;">${session.time}</span>
                     <br>
                     <span style="font-size: 0.75rem; color: #9ca3af;">${session.duration}</span>
                   </div>
                 </li>
               `).join('')}
             </ul>
           </div>
         </div>
       `;
    } else {
      // Multi-day event
      const days = Array.from({ length: daysDiff + 1 }, (_, index) => {
        const isFirstDay = index === 0;
        const isLastDay = index === daysDiff;
        const sessions = generateSessions(isFirstDay, isLastDay, index);
        
                 return `
           <div style="background-color: #f9fafb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem;">
             <h3 style="font-size: 1.125rem; font-weight: 500; color: #374151; margin-bottom: 0.75rem;">Day ${index + 1}</h3>
             <ul style="margin: 0; padding: 0; list-style: none;">
               ${sessions.map(session => `
                 <li style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 0.75rem;">
                   <div style="display: flex; align-items: center;">
                     <span style="width: 0.5rem; height: 0.5rem; background-color: #bc986b; border-radius: 50%; margin-right: 0.75rem;"></span>
                     <div>
                       <span style="font-weight: 500; color: #111827;">${session.title}</span>
                       ${session.speaker ? `<br><span style="font-size: 0.875rem; color: #6b7280;">by ${session.speaker}</span>` : ''}
                     </div>
                   </div>
                   <div style="text-align: right;">
                     <span style="color: #6b7280; font-size: 0.875rem;">${session.time}</span>
                     <br>
                     <span style="font-size: 0.75rem; color: #9ca3af;">${session.duration}</span>
                   </div>
                 </li>
               `).join('')}
             </ul>
           </div>
         `;
      }).join('');
      
             return `
         <div style="margin-bottom: 1.5rem;">
           <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Event Schedule</h2>
           <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
             <p style="font-size: 0.875rem; color: #1e40af;">
               <strong>Event Duration:</strong> ${event.eventDuration} minutes | 
               <strong>Location:</strong> ${event.location} | 
               <strong>Category:</strong> ${event.category} | 
               <strong>Duration:</strong> ${daysDiff + 1} day${daysDiff > 0 ? 's' : ''}
             </p>
           </div>
           ${days}
         </div>
       `;
    }
  };

  const agenda = getAgenda(event);

  return (
    <div className="space-y-8">
      {/* Event Details Card */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <Calendar className="h-5 w-5 mr-2 text-brand-secondary" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Date & Time</p>
                <p className="text-gray-600">
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {new Date(event.startDate).toDateString() !==
                    new Date(event.endDate).toDateString() && (
                    <>
                      {" "}
                      -{" "}
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Duration</p>
                <p className="text-gray-600">
                {event?.eventDuration} min
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>

          
          </div>
        </CardContent>
      </Card>

      {/* Speakers Section */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <Users className="h-5 w-5 mr-2 text-brand-secondary" />
            Featured Speakers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.speakers.map((speaker, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50/50"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Agenda */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Event Agenda
            {(!event.agenda || !event.agenda.trim()) && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Generated)
              </span>
            )}
          </CardTitle>
        </CardHeader>
                 <CardContent>
           <div 
             style={{
               fontSize: '1.125rem',
               lineHeight: '1.75',
               color: '#374151'
             }}
             dangerouslySetInnerHTML={{
               __html: agenda,
             }}
             className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h1]:mt-6 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h2]:mt-5 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-gray-800 [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-1 [&>strong]:font-semibold [&>em]:italic [&>blockquote]:border-l-4 [&>blockquote]:border-brand-secondary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
           />
         </CardContent>
      </Card>
    </div>
  );
};

export default EventContent;
