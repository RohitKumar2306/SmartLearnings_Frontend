import React from "react";
import "./CoursesToolbar.css";

export interface StatusOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

interface CoursesToolbarProps {
  // search
  searchTerm: string;
  onSearchChange: (value: string) => void;

  // status / category filter (meaning depends on the caller)
  statusFilter: string;
  onStatusChange: (value: string) => void;
  statusOptions: StatusOption[];

  // sort
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];

  // meta
  totalCount?: number;
  visibleCount?: number;

  // optional title/subtitle so admin / instructor / student
  // can customize copy
  title?: string;
  subtitle?: string;
}

const CoursesToolbar: React.FC<CoursesToolbarProps> = ({
                                                         searchTerm,
                                                         onSearchChange,
                                                         statusFilter,
                                                         onStatusChange,
                                                         statusOptions,
                                                         sortBy,
                                                         onSortChange,
                                                         sortOptions,
                                                         totalCount,
                                                         visibleCount,
                                                         title = "Courses",
                                                         subtitle = "Filter and sort your course list.",
                                                       }) => {
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSearchChange(e.target.value);
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onStatusChange(e.target.value);
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSortChange(e.target.value);
  };

  const showMeta =
    typeof totalCount === "number" &&
    typeof visibleCount === "number";

  return (
    <section className="card card-glass text-light courses-toolbar-card">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
          <div>
            <h2 className="courses-toolbar-title mb-1">
              {title}
            </h2>
            <p className="courses-toolbar-subtitle mb-0">
              {subtitle}
            </p>
          </div>

          {showMeta && (
            <span className="courses-toolbar-meta-pill">
              Showing{" "}
              <span className="fw-semibold">
                {visibleCount}
              </span>{" "}
              of{" "}
              <span className="fw-semibold">
                {totalCount}
              </span>{" "}
              courses
            </span>
          )}
        </div>

        <div className="row g-2 align-items-center">
          {/* Search */}
          <div className="col-12 col-md-5">
            <div className="courses-toolbar-search-wrapper">
              <span className="courses-toolbar-search-icon">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-sm courses-toolbar-search-input"
                placeholder="Search by course title, tag, or instructor..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Status filter */}
          <div className="col-6 col-md-3">
            <label className="courses-toolbar-label small mb-1">
              Status
            </label>
            <select
              className="form-select form-select-sm courses-toolbar-select"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="col-6 col-md-4">
            <label className="courses-toolbar-label small mb-1">
              Sort by
            </label>
            <select
              className="form-select form-select-sm courses-toolbar-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesToolbar;