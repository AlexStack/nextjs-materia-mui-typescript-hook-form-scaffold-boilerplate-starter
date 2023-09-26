export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface NpmData {
  version: string;
}
