import { getLocale } from "next-intl/server";
import HomeClient from "@/components/HomeClient";
import type {
  ProfileContent,
  CareerContent,
  ProjectsContent,
  CurrentlyContent,
} from "@/content/types";

async function getProfileContent(locale: string): Promise<ProfileContent> {
  if (locale === "pt") {
    const m = await import("@/content/profile.pt");
    return m.default;
  }
  const m = await import("@/content/profile.en");
  return m.default;
}

async function getCareerContent(locale: string): Promise<CareerContent> {
  if (locale === "pt") {
    const m = await import("@/content/career.pt");
    return m.default;
  }
  const m = await import("@/content/career.en");
  return m.default;
}

async function getProjectsContent(locale: string): Promise<ProjectsContent> {
  if (locale === "pt") {
    const m = await import("@/content/projects.pt");
    return m.default;
  }
  const m = await import("@/content/projects.en");
  return m.default;
}

async function getCurrentlyContent(locale: string): Promise<CurrentlyContent> {
  if (locale === "pt") {
    const m = await import("@/content/currently.pt");
    return m.default;
  }
  const m = await import("@/content/currently.en");
  return m.default;
}

export default async function HomePage() {
  const locale = await getLocale();

  const [profile, career, projects, currently] = await Promise.all([
    getProfileContent(locale ?? "en"),
    getCareerContent(locale ?? "en"),
    getProjectsContent(locale ?? "en"),
    getCurrentlyContent(locale ?? "en"),
  ]);

  return (
    <HomeClient
      profile={profile}
      career={career}
      projects={projects}
      currently={currently}
    />
  );
}
