"use client";
import React, { useEffect, useState, useRef } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { brandsData } from "@/data/brands/brandsdata";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { colors } from "@/data/products/productColor";
import { dummyCategories } from "@/data/category/categoryData";

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  id: string;
};

const FilterSection = ({ title, children, id }: FilterSectionProps) => (
  <section aria-labelledby={id} className="space-y-3">
    <h3 id={id} className="text-lg font-medium">
      {title}
    </h3>
    {children}
  </section>
);

const FilterOption = ({
  label,
  isSelected,
  onSelect,
  value,
  ariaLabel,
  children,
}: {
  label: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  value: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={cn(
      "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer transition-colors",
      isSelected && "bg-blue-400 dark:bg-blue-700 font-semibold"
    )}
    aria-pressed={isSelected}
    aria-label={ariaLabel || label}
  >
    {children || label}
  </button>
);

const ColorOption = ({
  color,
  isSelected,
  onSelect,
}: {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
}) => {
  const colorName = color.split("-")[0];
  return (
    <FilterOption
      label={colorName}
      value={color}
      isSelected={isSelected}
      onSelect={onSelect}
      ariaLabel={`Color ${colorName}`}
    >
      <span className="flex items-center justify-start gap-3">
        <span
          className="w-6 h-6 rounded-full border opacity-80"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        {colorName}
      </span>
    </FilterOption>
  );
};

const FilterProducts = () => {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [voiceInput, setVoiceInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState("");
  const recognitionRef = useRef<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPrice = searchParams.get("max") || "5000";
  const initialCategory = searchParams.get("category");
  const initialColor = searchParams.get("color");
  const initialBrand = searchParams.get("brand");

  useEffect(() => {
    setMaxValue(Number(initialPrice));
    setSelectedCategory(initialCategory as string);
    setSelectedColor(initialColor as string);
    setSelectedBrand(initialBrand as string);
  }, [initialPrice, initialCategory, initialColor, initialBrand]);

  const handleCategorySelection = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === selectedCategory) {
      newSearchParams.delete("category");
      setSelectedCategory("");
    } else {
      newSearchParams.set("category", category);
      setSelectedCategory(category);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(event.target.value);
    setMinValue(newMinValue);
    setMinAndMaxPrice(newMinValue, maxValue);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(event.target.value);
    setMaxValue(newMaxValue);
    setMinAndMaxPrice(minValue, newMaxValue);
  };

  const setMinAndMaxPrice = (minPrice: number, maxPrice: number) => {
    const min = Math.min(minPrice, maxPrice);
    const max = Math.max(minPrice, maxPrice);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("min", `${min}`);
    newSearchParams.set("max", `${max}`);
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleColorSelection = (color: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (color === selectedColor) {
      newSearchParams.delete("color");
      setSelectedColor("");
    } else {
      newSearchParams.set("color", color.split("-")[0]);
      setSelectedColor(color);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleBrandSelection = (brand: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (brand === selectedBrand) {
      newSearchParams.delete("brand");
      setSelectedBrand("");
    } else {
      newSearchParams.set("brand", brand);
      setSelectedBrand(brand);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const clearFilter = () => {
    setMinValue(10);
    setMaxValue(5000);
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedBrand("");

    const newSearchParams = new URLSearchParams();
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams}`);

    setVoiceFeedback("All filters have been cleared");
  };

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setVoiceFeedback("Speech recognition is not supported in your browser");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.continuous = true;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setVoiceFeedback(
        "Listening for voice commands... Say 'clear filters' to reset or specify filters"
      );
    };

    recognitionRef.current.onend = () => {
      // Automatically restart recognition when it ends
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    recognitionRef.current.onresult = (event: any) => {
      const result = event.results[event.results.length - 1][0].transcript;
      setVoiceInput(result);
      processVoiceCommand(result);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        // Automatically restart if no speech detected
        setTimeout(() => {
          if (isListening && recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 1000);
      } else {
        setVoiceFeedback(`Error: ${event.error}`);
      }
    };

    recognitionRef.current.start();
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceFeedback("Voice recognition stopped");
    }
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  const processVoiceCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();
    setVoiceFeedback(`Processing: "${normalizedCommand}"`);

    // Clear commands
    const clearCommands = [
      "clear filter",
      "clear filters",
      "reset filters",
      "remove filters",
      "reset all filters",
      "remove all filters",
    ];

    if (clearCommands.includes(normalizedCommand)) {
      clearFilter();
      return;
    }

    // Search products commands
    if (
      normalizedCommand.startsWith("search ") ||
      normalizedCommand.startsWith("find ")
    ) {
      const searchQuery = normalizedCommand.replace(/^(search|find)\s+/, "");
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("query", searchQuery);
      router.push(`${pathname}?${newSearchParams}`);
      setVoiceFeedback(`Searching for: ${searchQuery}`);
      return;
    }

    // Category filters
    const matchingCategory = dummyCategories.find(
      (category) => category.name.toLowerCase() === normalizedCommand
    );
    if (matchingCategory) {
      handleCategorySelection(matchingCategory.name);
      setVoiceFeedback(`Filtering by category: ${matchingCategory.name}`);
      return;
    }

    // Brand filters
    const matchingBrand = brandsData.find(
      (brand) => brand.toLowerCase() === normalizedCommand
    );
    if (matchingBrand) {
      handleBrandSelection(matchingBrand);
      setVoiceFeedback(`Filtering by brand: ${matchingBrand}`);
      return;
    }

    // Color filters
    const matchingColor = colors.find((color) =>
      color.toLowerCase().includes(normalizedCommand)
    );
    if (matchingColor) {
      handleColorSelection(matchingColor);
      setVoiceFeedback(`Filtering by color: ${matchingColor.split("-")[0]}`);
      return;
    }

    // Price range
    const pricePattern = /(\d+)\s*(to|-|and)\s*(\d+)/;
    const priceMatch = normalizedCommand.match(pricePattern);
    if (priceMatch) {
      const min = parseInt(priceMatch[1]);
      const max = parseInt(priceMatch[3]);
      setMinAndMaxPrice(min, max);
      setVoiceFeedback(`Price range set from ${min} to ${max}`);
      return;
    }

    // Single price (set both min and max)
    const singlePricePattern = /(price|max|min)\s*(\d+)/;
    const singlePriceMatch = normalizedCommand.match(singlePricePattern);
    if (singlePriceMatch) {
      const price = parseInt(singlePriceMatch[2]);
      setMinAndMaxPrice(price, price);
      setVoiceFeedback(`Price set to ${price}`);
      return;
    }

    setVoiceFeedback(
      `Command not recognized: "${normalizedCommand}". Try "search [product]", "clear filters", or specify filters`
    );
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <aside
      aria-label="Product filters"
      className="relative w-72 p-4 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <header className="space-y-2">
        <h2 className="text-xl font-bold">Filter Products</h2>
        <Separator />
      </header>

      <div className="space-y-6">
        <FilterSection title="By Price" id="price-filter">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <Label htmlFor="min">Minimum Price</Label>
              <Input
                id="min"
                aria-label="Minimum price"
                placeholder="$10"
                value={minValue}
                min={2}
                type="number"
                onChange={handleMinPriceChange}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="max">Maximum Price</Label>
              <Input
                id="max"
                aria-label="Maximum price"
                placeholder="$2000"
                min={2}
                value={maxValue}
                type="number"
                onChange={handleMaxPriceChange}
                className="w-full"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection title="By Categories" id="category-filter">
          <div
            role="group"
            aria-labelledby="category-filter"
            className="flex flex-wrap gap-2"
          >
            {dummyCategories.map((category) => (
              <FilterOption
                key={category.id}
                label={category.name}
                value={category.name}
                isSelected={category.name === selectedCategory}
                onSelect={handleCategorySelection}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="By Colors" id="color-filter">
          <div
            role="group"
            aria-labelledby="color-filter"
            className="flex flex-wrap gap-2"
          >
            {colors.map((color) => (
              <ColorOption
                key={color}
                color={color}
                isSelected={color === selectedColor}
                onSelect={handleColorSelection}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="By Brands" id="brand-filter">
          <div
            role="group"
            aria-labelledby="brand-filter"
            className="flex flex-wrap gap-2"
          >
            {brandsData.map((brand) => (
              <FilterOption
                key={brand}
                label={brand}
                value={brand}
                isSelected={brand === selectedBrand}
                onSelect={handleBrandSelection}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      <div className="space-y-3">
        <Button
          onClick={clearFilter}
          variant="outline"
          className="w-full"
          aria-label="Clear all filters"
        >
          Clear All Filters
        </Button>

        <Button
          onClick={toggleVoiceRecognition}
          variant={isListening ? "destructive" : "secondary"}
          className="w-full flex items-center gap-2"
          aria-live="polite"
          aria-label={
            isListening ? "Stop voice recognition" : "Start voice recognition"
          }
        >
          {isListening ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Stop Voice Control
            </>
          ) : (
            "Start Voice Control"
          )}
        </Button>

        <div
          className="text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded"
          aria-live="assertive"
        >
          {voiceFeedback && <p>Voice feedback: {voiceFeedback}</p>}
          {voiceInput && <p>Last command: {voiceInput}</p>}
          {isListening && (
            <p className="text-green-600 dark:text-green-400">
              Microphone is active
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterProducts;
