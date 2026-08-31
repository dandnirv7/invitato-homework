import axios from "axios";
import { WishInput } from "../lib/schemas";
import { Wish } from "../types";

export async function submitWish(data: WishInput): Promise<Wish> {
  const response = await axios.post<{ data: Wish }>("/api/wishes", data);
  return response.data.data;
}
