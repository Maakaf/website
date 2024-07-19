import { z } from "zod";

export enum ProjectPaginationFilter {
  ALL = 'all',
  RECENTLY_UPDATED = 'recently_updated',
  MOST_CONTROBUTORS = 'most_contributors',
  RECENTLY_CREATED = 'recently_created',
}

export type IProjectsDataResponse = {
  projects: Project[];
  total: number;
  languages: string[];
  pageLanguages: string[];
  timestamp: Date;
};

const dateToString = z.coerce.date().or(z.string());

const SummarySchema = z.object({
  timestamp: z.string(),
  item: z.object({
    name: z.string(),
    owner: z
      .object({
        id: z.string(),
        login: z.string(),
        avatarUrl: z.string(),
      })
      ,
    description: z.string().nullable(),
    url: z.string(),
    stargazerCount: z.number(),
    languages: z.array(z.string()),
    contributors: z
      .array(
        z
          .object({
            login: z.string(),
            avatarUrl: z.string(),
          })
          ,
      ),
    createdAt: dateToString,
    updatedAt: dateToString,
  }),
  errorsData: z
    .array(
      z
        .object({
          type: z.string(),
          message: z.string(),
        })
        ,
    )
    ,
});

export const SummaryProjectType = SummarySchema;

export type Project = z.infer<typeof SummarySchema>;

