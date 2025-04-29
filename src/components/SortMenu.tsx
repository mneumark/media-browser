import clsx from 'clsx'

export enum SortOption {
  NAME_ASC = 'name.asc',
  NAME_DESC = 'name.desc',
  DATE_ASC = 'date.asc',
  DATE_DESC = 'date.desc',
}

export function SortMenu({
  sortBy,
  setSortBy,
  className,
}: {
  sortBy: string;
  setSortBy: (sortBy: SortOption) => void;
  className?: string;
}) {
  return (
    <div className={clsx('flex w-fit items-center p-4 text-white gap-3', className)}>
      <h2 className="text-xl font-bold">Sort By</h2>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="bg-gray-700 text-white p-2 rounded"
      >
        <option value={SortOption.NAME_ASC}>Name Ascending</option>
        <option value={SortOption.NAME_DESC}>Name Descending</option>
        <option value={SortOption.DATE_ASC}>Release Date Ascending</option>
        <option value={SortOption.DATE_DESC}>Release Date Descending</option>
      </select>
    </div>
  );
}