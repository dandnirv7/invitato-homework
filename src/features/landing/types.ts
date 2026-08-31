export interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface Rsvp {
  id: number;
  name: string;
  attendance: "attending" | "not_attending";
  party_size: number;
  created_at: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
