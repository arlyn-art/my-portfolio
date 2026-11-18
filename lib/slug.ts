export function getProjectTitle(project: {
  title: string | { id?: string; en?: string };
}): string {
  if (typeof project.title === 'string') return project.title;
  return project.title?.id ?? project.title?.en ?? '';
}

export function generateProjectSlug(project: {
  id: string;
  title: string | { id?: string; en?: string };
}): string {
  const title = getProjectTitle(project);
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-')         
    .replace(/-+/g, '-');         

  return slug || project.id;
}