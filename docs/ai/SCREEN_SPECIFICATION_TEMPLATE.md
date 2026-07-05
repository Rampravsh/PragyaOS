# Screen Specification Template

Use this template to specify the architecture and layout of a screen before generating code.

---

## 1. Metadata

*   **Screen Name**: [e.g. Instructor Course Settings Screen]
*   **Target Route**: [e.g. `/studio/courses/:courseId/settings`]
*   **Access Requirements**: [e.g. `requireAuth` + `role === 'INSTRUCTOR'`]
*   **Visual Environment**: [Marketing (Ellipsus style) OR Workspace (Linear style)]

---

## 2. Layout & Composition Tree

Define the structure from the layout layer down to the components.

```
[Page: CourseSettingsPage]
   └── [Layout: StudioLayout]
          └── [Composition: CourseSettingsFormComposition]
                 ├── [Feature Component: GeneralDetailsSection]
                 │      └── [@pragyaos/ui: Input]
                 ├── [Feature Component: DeactivationZone]
                 │      └── [@pragyaos/ui: Dialog]
                 └── [Composition: SidebarNavigation]
```

---

## 3. Data Integration & State Layer

### Server State (TanStack Query)
*   **Fetch Hook**: `useCourseDetail(courseId)`
    *   *Repository Method*: `CourseRepository.getById(courseId)`
    *   *Key Cache mapping*: `['courses', 'detail', courseId]`
*   **Mutation Hook**: `useUpdateCourse(courseId)`
    *   *Repository Method*: `CourseRepository.update(courseId, payload)`
    *   *Cache Invalidation Query*: `['courses', 'detail', courseId]`

### Client/Local State
*   **Form State Schema**: `CourseSettingsSchema` (Zod validation definition)
*   **Local State**: `isEditing` toggle, `hasUnsavedChanges` indicator.

---

## 4. Interaction Specifications

*   **Keyboard Navigation**: Tab indexing sequence, action keys (e.g. `Ctrl+S` to save).
*   **Responsive Adaptation**: 
    *   `Desktop (>1024px)`: Multi-pane side-by-side grids.
    *   `Mobile (<768px)`: Stacked cards with navigation bar docked at the bottom.
*   **Transition & Motion Tokens**:
    *   Modal Pop: `themeTokens.animations.spring.pop`
    *   Hover Transition: `themeTokens.animations.ease.normal`

---

## 5. Testing Requirements

*   **Unit Tests**: Validate Zod payload mapping on client input.
*   **Integration Tests**: Verify that authorization block works when dynamic role changes to student.
*   **Mock Handlers**: Configure MSW intercepts for `/courses/:id` endpoints.
