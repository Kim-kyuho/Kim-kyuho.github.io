import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 정적 사이트로 내보내기 설정
  trailingSlash: true, // URL 끝에 슬래시 추가
};

export default nextConfig;
