"use server";
import { createClient } from "@libsql/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function handleRewardForm(prevState: any, body: FormData) {
  console.log(body);
  const token = body.get("cf-turnstile-response");
  if (!token) return;
  const SECRET_KEY = "0x4AAAAAAAgUrpTM04_dzcY-uJwmmmZ7n3o";
  const headerList = headers();
  const ip = headerList.get("CF-Connecting-IP");
  if (!ip) return;

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token?.toString());
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();
  if (outcome.success) {
    const TURSO_TOKEN =
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjI1NjcyNDUsImlkIjoiZjE5OTUzNDktNmZmOS00ZDllLTlmNzctMjUzNWJkYjdkMjVjIn0.bF0VtQe7kdkdhdrg10t6x8l-WPTmAREqu9mA4Zm_4U7Mn2XmaMcCW-p15W1v-xuiIWRZBjYl7WEw8bZL6btACw";
    const turso = createClient({
      url: "libsql://gross-crm-samueleguino97.turso.io",
      authToken: TURSO_TOKEN,
    });
    const existingClient = await turso.execute({
      sql: "SELECT * FROM clients WHERE phone = ?",
      args: [body.get("phone")?.toString() || ""],
    });

    if (existingClient.rows.length > 0) {
      return {
        success: false,
        message: "Ya existe un cliente con ese numero de telefono",
      };
    }
    await turso.execute({
      sql: "INSERT INTO clients (name, email, phone, birthday) VALUES (?, ?, ?, ?)",
      args: [
        body.get("name")?.toString() || "",
        body.get("email")?.toString() || "",
        body.get("phone")?.toString() || "",
        body.get("birthday")?.toString() || "",
      ],
    });
    return {
      success: true,
      message: "Gracias por tu reseña!",
    };
  } else {
    return { success: false, message: "Captcha incorrecto" };
  }
}
