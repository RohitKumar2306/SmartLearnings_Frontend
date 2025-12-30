import React, { useEffect, useMemo, useState } from "react";
import "./CourseMetadataDrawer.css";
import { ManagedCourse } from "../../types/courses.ts";
import { CourseCategory, CourseTag } from "../CourseCategoryManager/CourseCategoryManager.tsx";

interface Props {
  open: boolean;
  onClose: () => void;

  course: ManagedCourse | null;

  categories: CourseCategory[];
  tags: CourseTag[];

  onSave?: (updated: ManagedCourse) => void;
}

const CourseMetadataDrawer: React.FC<Props> = ({
                                                 open,
                                                 onClose,
                                                 course,
                                                 categories,
                                                 tags,
                                                 onSave,
                                               }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);

  // Reset local state when drawer opens / course changes
  useEffect(() => {
    if (!course) return;
    setCategoryName(course.category || "");
    setSelectedTagNames(course.tags ?? []);
  }, [course]);

  const availableTagNames = useMemo(
    () => tags.map((t) => t.name),
    [tags]
  );

  const toggleTag = (tagName: string) => {
    setSelectedTagNames((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleSave = () => {
    if (!course || !onSave) return;

    const trimmedCategory = categoryName.trim();
    const updated: ManagedCourse = {
      ...course,
      category: trimmedCategory || course.category,
      tags: selectedTagNames,
      // lastUpdatedAt: new Date().toISOString()  // optionally bump timestamp
    };

    onSave(updated);
    onClose();
  };

  if (!open || !course) {
    return null;
  }

  return (
    <div className="cmd-overlay" role="dialog" aria-modal="true">
      <div className="cmd-panel">
        {/* Header */}
        <div className="cmd-header">
          <div>
            <h2 className="cmd-title mb-1">Course details</h2>
            <p className="cmd-subtitle mb-0">
              Update category and tags for <span className="cmd-course-name">{course.title}</span>.
            </p>
          </div>
          <button
            type="button"
            className="cmd-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cmd-body">
          {/* Category */}
          <section className="cmd-section mb-3">
            <h3 className="cmd-section-title mb-1">Category</h3>
            <p className="cmd-section-subtitle mb-2">
              Pick the primary bucket this course belongs to.
            </p>

            <select
              className="form-select form-select-sm cmd-select"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              {/* You can also use category IDs; for now we store name */}
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </section>

          {/* Tags */}
          <section className="cmd-section">
            <h3 className="cmd-section-title mb-1">Tags</h3>
            <p className="cmd-section-subtitle mb-2">
              Add labels learners can search and filter by.
            </p>

            {availableTagNames.length === 0 ? (
              <p className="small text-muted mb-0">
                No tags defined yet. Create tags from “Manage categories”.
              </p>
            ) : (
              <div className="cmd-tags-grid">
                {availableTagNames.map((name) => {
                  const active = selectedTagNames.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      className={
                        "cmd-tag-pill" + (active ? " cmd-tag-pill--active" : "")
                      }
                      onClick={() => toggleTag(name)}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="cmd-footer">
          <button
            type="button"
            className="btn btn-sm btn-outline-light cmd-footer-btn me-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-sm cmd-footer-btn-primary"
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMetadataDrawer;