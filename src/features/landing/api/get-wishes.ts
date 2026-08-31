import axios from "axios";
import { Wish } from "../types";

export async function getWishes(): Promise<Wish[]> {
  const response = await axios.get<{ data: Wish[] }>("/api/wishes");
  return response.data.data;
}
