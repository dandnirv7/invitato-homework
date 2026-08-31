import axios from "axios";
import { RsvpInput } from "../lib/schemas";
import { Rsvp } from "../types";

export async function submitRsvp(data: RsvpInput): Promise<Rsvp> {
  const response = await axios.post<{ data: Rsvp }>("/api/rsvp", data);
  return response.data.data;
}
