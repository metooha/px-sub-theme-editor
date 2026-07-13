import "./global.css";

import "./i18n";
import { createRoot } from "react-dom/client";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MartyProvider } from "@/contexts/MartyContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ComponentLibraryLayout } from "./components/ComponentLibraryLayout";
import MartyFloatingPanel from "@/features/marty/MartyFloatingPanel";

import React from 'react';

// Main app pages (lazy loaded for code splitting)
const Index = React.lazy(() => import("./pages/Index"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const PageTemplate = React.lazy(() => import("./pages/PageTemplate"));
const LandingConnection = React.lazy(() => import("./pages/LandingConnection"));
const DetailItem = React.lazy(() => import("./pages/DetailItem"));
const LandingSummary = React.lazy(() => import("./pages/LandingSummary"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BrandShopBuilder = React.lazy(() => import("./features/brand-shop/BrandShopBuilder"));

// Component library pages (lazy loaded)
const ComponentLibraryOverview = React.lazy(() => import("./pages/component-library/Overview"));
const ComponentTester = React.lazy(() => import("./pages/component-library/ComponentTester"));
const IconsPage = React.lazy(() => import("./pages/component-library/Icons"));
const ButtonsPage = React.lazy(() => import("./pages/component-library/Buttons"));
const BadgesPage = React.lazy(() => import("./pages/component-library/Badges"));
const BreadcrumbsPage = React.lazy(() => import("./pages/component-library/Breadcrumbs"));
const LinksPage = React.lazy(() => import("./pages/component-library/Links"));
const LinkButtonsPage = React.lazy(() => import("./pages/component-library/LinkButtons"));
const IconButtonsPage = React.lazy(() => import("./pages/component-library/IconButtons"));
const CheckboxesPage = React.lazy(() => import("./pages/component-library/Checkboxes"));
const RadioButtonsPage = React.lazy(() => import("./pages/component-library/RadioButtons"));
const SelectPage = React.lazy(() => import("./pages/component-library/Select"));
const FormGroupsPage = React.lazy(() => import("./pages/component-library/FormGroups"));
const ChipsPage = React.lazy(() => import("./pages/component-library/Chips"));
const FilterChipsPage = React.lazy(() => import("./pages/component-library/FilterChips"));
const CalloutsPage = React.lazy(() => import("./pages/component-library/Callouts"));
const CardsPage = React.lazy(() => import("./pages/component-library/Cards"));
const AlertsPage = React.lazy(() => import("./pages/component-library/Alerts"));
const ContentMessagesPage = React.lazy(() => import("./pages/component-library/ContentMessages"));
const DateFieldsPage = React.lazy(() => import("./pages/component-library/DateFields"));
const DatePickersPage = React.lazy(() => import("./pages/component-library/DatePickers"));
const DividersPage = React.lazy(() => import("./pages/component-library/Dividers"));
const ListsPage = React.lazy(() => import("./pages/component-library/Lists"));
const MagicBoxPage = React.lazy(() => import("./pages/component-library/MagicBox"));
const MetricsPage = React.lazy(() => import("./pages/component-library/Metrics"));
const ModalsPage = React.lazy(() => import("./pages/component-library/Modals"));
const NudgesPage = React.lazy(() => import("./pages/component-library/Nudges"));
const PanelsPage = React.lazy(() => import("./pages/component-library/Panels"));
const GuidelinesPage = React.lazy(() => import("./pages/component-library/Guidelines"));
const GettingStartedPage = React.lazy(() => import("./pages/component-library/GettingStarted"));

// Shadcn/Radix component pages (lazy loaded to avoid blocking initial render)
const AccordionPage = React.lazy(() => import("./pages/component-library/Accordion"));
const AlertDialogPage = React.lazy(() => import("./pages/component-library/AlertDialog"));
const AvatarPage = React.lazy(() => import("./pages/component-library/Avatar"));
const BottomSheetPage = React.lazy(() => import("./pages/component-library/BottomSheet"));
const DateRangePickerPage = React.lazy(() => import("./pages/component-library/DateRangePicker"));
const CarouselPage = React.lazy(() => import("./pages/component-library/Carousel"));
const ChartPage = React.lazy(() => import("./pages/component-library/Chart"));
const CollapsiblePage = React.lazy(() => import("./pages/component-library/Collapsible"));
const CommandPage = React.lazy(() => import("./pages/component-library/Command"));
const ContextMenuPage = React.lazy(() => import("./pages/component-library/ContextMenu"));
const DropdownMenuPage = React.lazy(() => import("./pages/component-library/DropdownMenu"));
const FormPage = React.lazy(() => import("./pages/component-library/Form"));
const MenubarPage = React.lazy(() => import("./pages/component-library/Menubar"));
const NavigationMenuPage = React.lazy(() => import("./pages/component-library/NavigationMenu"));
const PaginationPage = React.lazy(() => import("./pages/component-library/Pagination"));
const PopoverPage = React.lazy(() => import("./pages/component-library/Popover"));
const ProgressIndicatorPage = React.lazy(() => import("./pages/component-library/ProgressIndicator"));
const ProgressTrackerPage = React.lazy(() => import("./pages/component-library/ProgressTracker"));
const ScrollAreaPage = React.lazy(() => import("./pages/component-library/ScrollArea"));
const SkeletonPage = React.lazy(() => import("./pages/component-library/Skeleton"));
const SliderPage = React.lazy(() => import("./pages/component-library/Slider"));
const SegmentedControlsPage = React.lazy(() => import("./pages/component-library/SegmentedControls"));
const QuantityStepperPage = React.lazy(() => import("./pages/component-library/QuantityStepperPage"));
const SnackbarsPage = React.lazy(() => import("./pages/component-library/Snackbars"));
const SpinnersPage = React.lazy(() => import("./pages/component-library/Spinners"));
const SpotIconsPage = React.lazy(() => import("./pages/component-library/SpotIcons"));
const SwitchesPage = React.lazy(() => import("./pages/component-library/Switches"));
const TablePage = React.lazy(() => import("./pages/component-library/Table"));
const TabsPage = React.lazy(() => import("./pages/component-library/Tabs"));
const TagsPage = React.lazy(() => import("./pages/component-library/Tags"));
const TextAreaPage = React.lazy(() => import("./pages/component-library/TextArea"));
const TextFieldsPage = React.lazy(() => import("./pages/component-library/TextFields"));
const ThemesPage = React.lazy(() => import("./pages/component-library/Themes"));
const ThemeEditorPage = React.lazy(() => import("./pages/component-library/ThemeEditor"));
const ColorBrowserPage = React.lazy(() => import("./pages/component-library/ThemeCreatorFinal"));
const TogglePage = React.lazy(() => import("./pages/component-library/Toggle"));
const SectionsPage = React.lazy(() => import("./pages/component-library/Sections"));

const LazyFallback = <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>Loading...</div>;

const queryClient = new QueryClient();

// Main App component with routing
const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SnackbarContainer />
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <MartyProvider>
            <React.Suspense fallback={LazyFallback}>
            <Routes>
              {/* Component Library with nested routes */}
              <Route path="/component-library" element={<ComponentLibraryLayout />}>
                <Route index element={<ComponentLibraryOverview />} />
                <Route path="themes" element={<ThemesPage />} />
                <Route path="theme-editor" element={<ThemeEditorPage />} />
                <Route path="color-browser" element={<ColorBrowserPage />} />
                <Route path="component-tester" element={<ComponentTester />} />
                <Route path="icons" element={<IconsPage />} />
                <Route path="buttons" element={<ButtonsPage />} />
                <Route path="badges" element={<BadgesPage />} />
                <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="link-buttons" element={<LinkButtonsPage />} />
                <Route path="icon-buttons" element={<IconButtonsPage />} />
                <Route path="checkboxes" element={<CheckboxesPage />} />
                <Route path="radio-buttons" element={<RadioButtonsPage />} />
                <Route path="select" element={<SelectPage />} />
                <Route path="form-groups" element={<FormGroupsPage />} />
                <Route path="chips" element={<ChipsPage />} />
                <Route path="filter-chips" element={<FilterChipsPage />} />
                <Route path="callouts" element={<CalloutsPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="content-messages" element={<ContentMessagesPage />} />
                <Route path="date-fields" element={<DateFieldsPage />} />
                <Route path="date-pickers" element={<DatePickersPage />} />
                <Route path="date-range-picker" element={<DateRangePickerPage />} />
                <Route path="dividers" element={<DividersPage />} />
                <Route path="lists" element={<ListsPage />} />
                <Route path="magic-box" element={<MagicBoxPage />} />
                <Route path="menu" element={<Navigate to="/component-library/dropdown-menu" replace />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="modals" element={<ModalsPage />} />
                <Route path="nudges" element={<NudgesPage />} />
                <Route path="panels" element={<PanelsPage />} />
                <Route path="text-fields" element={<TextFieldsPage />} />
                <Route path="textarea" element={<TextAreaPage />} />
                <Route path="guidelines" element={<GuidelinesPage />} />
                <Route path="getting-started" element={<GettingStartedPage />} />
                {/* Shadcn/Radix Components */}
                <Route path="accordion" element={<AccordionPage />} />
                <Route path="alert-dialog" element={<AlertDialogPage />} />
                <Route path="avatar" element={<AvatarPage />} />
                <Route path="bottom-sheet" element={<BottomSheetPage />} />
                <Route path="calendar" element={<Navigate to="/component-library/date-pickers" replace />} />
                <Route path="carousel" element={<CarouselPage />} />
                <Route path="chart" element={<ChartPage />} />
                <Route path="collapsible" element={<CollapsiblePage />} />
                <Route path="command" element={<CommandPage />} />
                <Route path="context-menu" element={<ContextMenuPage />} />
                <Route path="dialog" element={<Navigate to="/component-library/modals" replace />} />
                <Route path="drawer" element={<Navigate to="/component-library/bottom-sheet" replace />} />
                <Route path="dropdown-menu" element={<DropdownMenuPage />} />
                <Route path="form" element={<FormPage />} />
                <Route path="menubar" element={<MenubarPage />} />
                <Route path="navigation-menu" element={<NavigationMenuPage />} />
                <Route path="pagination" element={<PaginationPage />} />
                <Route path="popover" element={<PopoverPage />} />
                <Route path="progress-indicator" element={<ProgressIndicatorPage />} />
                <Route path="progress-tracker" element={<ProgressTrackerPage />} />
                <Route path="scroll-area" element={<ScrollAreaPage />} />
                <Route path="skeleton" element={<SkeletonPage />} />
                <Route path="slider" element={<SliderPage />} />
                <Route path="snackbars" element={<SnackbarsPage />} />
                <Route path="spinners" element={<SpinnersPage />} />
                <Route path="spot-icons" element={<SpotIconsPage />} />
                <Route path="segmented-control" element={<SegmentedControlsPage />} />
                <Route path="quantity-stepper" element={<QuantityStepperPage />} />
                <Route path="switches" element={<SwitchesPage />} />
                <Route path="table" element={<TablePage />} />
                <Route path="tabs" element={<TabsPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="toggle" element={<TogglePage />} />
                <Route path="sections" element={<SectionsPage />} />
              </Route>

              {/* Template Homepage */}
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/page-template" element={<PageTemplate />} />
              <Route path="/landing-connection" element={<LandingConnection />} />
              <Route path="/landing-summary" element={<LandingSummary />} />
              <Route path="/brand-shop" element={<BrandShopBuilder />} />
              <Route path="/detail-item" element={<DetailItem />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MartyFloatingPanel />
            </React.Suspense>
        </MartyProvider>
          </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);
