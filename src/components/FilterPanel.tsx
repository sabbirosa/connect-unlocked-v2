import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multi-select";
import { Check, RotateCcw, Settings } from "lucide-react";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hideFilledSections: boolean;
  onHideFilledSectionsChange: (value: boolean) => void;
  facultiesToAvoid: string;
  onFacultiesToAvoidChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  facultySuggestions: string[];
}

const FilterPanel = ({
  isOpen,
  onClose,
  hideFilledSections,
  onHideFilledSectionsChange,
  facultiesToAvoid,
  onFacultiesToAvoidChange,
  onApply,
  onReset,
  facultySuggestions,
}: FilterPanelProps) => {
  // Convert facultiesToAvoid string to MultiSelectValue array
  const currentFaculties = facultiesToAvoid
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f)
    .map((faculty) => ({ value: faculty, label: faculty }));

  const handleFacultiesChange = (
    values: { value: string; label: string }[]
  ) => {
    const facultyString = values.map((v) => v.value).join(", ");
    onFacultiesToAvoidChange(facultyString);
  };

  const facultyOptions = facultySuggestions.map((faculty) => ({
    value: faculty,
    label: faculty,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Settings size={20} className="text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">Advanced Filters</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your course search with these powerful filtering options
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hide Filled Sections Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-foreground">Hide Filled Sections</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Exclude courses that have no available seats
                </p>
              </div>
              <button
                onClick={() => onHideFilledSectionsChange(!hideFilledSections)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                  hideFilledSections ? "bg-primary shadow-lg" : "bg-muted/50"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-md transition-all duration-300 ${
                    hideFilledSections ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Faculties to Avoid */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-foreground">Faculties to Avoid</label>
              <p className="text-xs text-muted-foreground mt-1">
                Select faculty initials you want to exclude from results
              </p>
            </div>
            <div className="bg-muted/20 rounded-lg p-3">
              <MultiSelect
                values={currentFaculties}
                onValuesChange={handleFacultiesChange}
                options={facultyOptions}
                placeholder="Type faculty initials to add..."
              />
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Click on chips to remove them, or type to add more faculty initials
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/20">
            <Button 
              onClick={onApply} 
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg py-3 text-base font-semibold"
            >
              <Check size={18} className="mr-2" />
              Apply Filters
            </Button>
            <Button 
              onClick={onReset} 
              variant="outline" 
              className="flex-1 border-border/50 hover:bg-muted/20 py-3 text-base font-semibold"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPanel;
