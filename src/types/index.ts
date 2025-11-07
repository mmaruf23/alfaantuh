import type { StatusCode } from "hono/utils/http-status";

type SuccessResponse<T> = {
  success: true;
  code: StatusCode;
  data?: T;
};

type ErrorResponse = {
  success: false;
  code: StatusCode;
  message: string;
};

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

export type PluData = {
  kd_store: string;
  nama_store: string;
  cabang: string;
  personel: string;
  kode_program: string;
  nama_program: string;
  plu: string;
  descp: string;
  target: string;
};

export type WeekType = "now" | "before" | "next";
