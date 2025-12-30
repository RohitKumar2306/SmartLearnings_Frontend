import React, { useMemo, useState } from "react";
import "./CourseCategoryManager.css";

export interface CourseCategory {
  id: string;
  name: string;
  description?: string;
}

export interface CourseTag {
  id: string;
  name: string;
  categoryId?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  categories: CourseCategory[];
  tags: CourseTag[];

  onCreateCategory?: (name: string) => void;
  onDeleteCategory?: (id: string) => void;

  onCreateTag?: (name: string, categoryId?: string) => void;
  onDeleteTag?: (id: string) => void;
}

const CourseCategoryManager: React.FC<Props> = ({
                                                  open,
                                                  onClose,
                                                  categories,
                                                  tags,
                                                  onCreateCategory,
                                                  onDeleteCategory,
                                                  onCreateTag,
                                                  onDeleteTag,
                                                }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "ALL">(
    "ALL"
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");

  const visibleTags = useMemo(() => {
    if (selectedCategoryId === "ALL") return tags;
    return tags.filter((t) => t.categoryId === selectedCategoryId);
  }, [tags, selectedCategoryId]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreateCategory) return;
    onCreateCategory(newCategoryName);
    setNewCategoryName("");
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreateTag) return;
    onCreateTag(
      newTagName,
      selectedCategoryId !== "ALL" ? selectedCategoryId : undefined
    );
    setNewTagName("");
  };

  if (!open) {
    return null;
  }

  return (
    <div className="ccm-overlay" role="dialog" aria-modal="true">
      <div className="ccm-panel">
        {/* Header */}
        <div className="ccm-header">
          <div>
            <h2 className="ccm-title mb-1">Categories &amp; Tags</h2>
            <p className="ccm-subtitle mb-0">
              Organize your course catalog. Changes here will be used across the
              platform.
            </p>
          </div>
          <button
            type="button"
            className="ccm-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="ccm-body">
          <div className="ccm-columns">
            {/* Categories column */}
            <div className="ccm-column ccm-column-categories">
              <div className="ccm-section-header">
                <h3 className="ccm-section-title mb-1">Categories</h3>
                <p className="ccm-section-subtitle mb-0">
                  High-level buckets for grouping courses.
                </p>
              </div>

              <form className="ccm-inline-form mb-3" onSubmit={handleAddCategory}>
                <input
                  type="text"
                  className="form-control form-control-sm ccm-input"
                  placeholder="Add new category…"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-xxs ccm-btn-primary"
                  disabled={!newCategoryName.trim()}
                >
                  Add
                </button>
              </form>

              <ul className="ccm-category-list">
                <li
                  className={`ccm-category-item ${
                    selectedCategoryId === "ALL" ? "is-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="ccm-category-chip"
                    onClick={() => setSelectedCategoryId("ALL")}
                  >
                    All categories
                  </button>
                </li>

                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className={`ccm-category-item ${
                      selectedCategoryId === cat.id ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="ccm-category-chip"
                      onClick={() => setSelectedCategoryId(cat.id)}
                    >
                      {cat.name}
                    </button>
                    {onDeleteCategory && (
                      <button
                        type="button"
                        className="ccm-icon-btn"
                        onClick={() => onDeleteCategory(cat.id)}
                        aria-label="Delete category"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags column */}
            <div className="ccm-column ccm-column-tags">
              <div className="ccm-section-header">
                <h3 className="ccm-section-title mb-1">Tags</h3>
                <p className="ccm-section-subtitle mb-0">
                  Add fine-grained labels learners can search and filter by.
                </p>
              </div>

              <form className="ccm-inline-form mb-3" onSubmit={handleAddTag}>
                <input
                  type="text"
                  className="form-control form-control-sm ccm-input"
                  placeholder={
                    selectedCategoryId === "ALL"
                      ? "Add tag (no specific category)…"
                      : "Add tag for this category…"
                  }
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-xxs ccm-btn-outline"
                  disabled={!newTagName.trim()}
                >
                  Add
                </button>
              </form>

              <div className="ccm-tags-wrapper">
                {visibleTags.length === 0 ? (
                  <p className="small text-muted mb-0">
                    No tags yet{" "}
                    {selectedCategoryId !== "ALL" && "for this category."}
                  </p>
                ) : (
                  <ul className="ccm-tag-list">
                    {visibleTags.map((tag) => (
                      <li key={tag.id} className="ccm-tag-item">
                        <span className="ccm-tag-pill">{tag.name}</span>
                        {onDeleteTag && (
                          <button
                            type="button"
                            className="ccm-icon-btn"
                            onClick={() => onDeleteTag(tag.id)}
                            aria-label="Delete tag"
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ccm-footer">
          <button
            type="button"
            className="btn btn-sm btn-outline-light ccm-footer-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCategoryManager;