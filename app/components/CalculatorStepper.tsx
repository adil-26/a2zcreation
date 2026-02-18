"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Input } from "./ui/Input";
import { Calculator, Check, ChevronRight, ChevronLeft, Home, Ruler, Layers, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Property Type", icon: Home },
  { id: 2, title: "Size & Scope", icon: Ruler },
  { id: 3, title: "Requirements", icon: Layers },
  { id: 4, title: "Contact", icon: Phone },
];

const basePrice: Record<string, number> = {
  apartment: 1800,
  villa: 2300,
  office: 2100,
};

export default function CalculatorStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "apartment",
    sqft: 1200,
    kitchen: "yes",
    wardrobes: 3,
    phone: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateEstimate = () => {
    const kitchenCost = formData.kitchen === "yes" ? 120000 : 0;
    const sqftCost = (basePrice[formData.propertyType] || 1700) * Number(formData.sqft);
    const wardrobeCost = Number(formData.wardrobes) * 35000;
    const estimate = Math.round(sqftCost + wardrobeCost + kitchenCost);

    const min = Math.round(estimate * 0.9);
    const max = Math.round(estimate * 1.12);

    return { min, max };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { min, max } = calculateEstimate();
    setResult(`Estimated Limit: ₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")}`);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Stepper Header */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 translate-y-[-50%]" />
        <div className="absolute top-1/2 left-0 h-1 bg-brand -z-10 translate-y-[-50%] transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-bold",
                currentStep >= step.id
                  ? "bg-brand border-brand text-white"
                  : "bg-white border-gray-300 text-gray-400"
              )}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-wider hidden md:block", currentStep >= step.id ? "text-brand" : "text-muted")}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <Card className="shadow-2xl border-none overflow-hidden">
        <div className="bg-brand/5 p-6 border-b border-brand/10">
          <h2 className="text-2xl font-bold font-fraunces flex items-center gap-3">
            {(() => {
              const Icon = steps.find(s => s.id === currentStep)?.icon;
              return Icon ? <Icon className="w-6 h-6 text-brand" /> : null;
            })()}
            {steps.find(s => s.id === currentStep)?.title}
          </h2>
        </div>
        <CardContent className="p-8">
          {!result ? (
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['apartment', 'villa', 'office'].map((type) => (
                        <div
                          key={type}
                          onClick={() => setFormData({ ...formData, propertyType: type })}
                          className={cn(
                            "cursor-pointer rounded-2xl border-2 p-6 text-center hover:border-brand transition-all",
                            formData.propertyType === type ? "border-brand bg-brand/5" : "border-line"
                          )}
                        >
                          <div className="text-lg font-bold capitalize mb-2">{type}</div>
                          <div className="text-sm text-muted">Starting ₹{basePrice[type]}/sqft</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="block text-sm font-bold">Total Area (sq. ft.)</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="300"
                          max="5000"
                          step="50"
                          name="sqft"
                          value={formData.sqft}
                          onChange={handleChange}
                          className="w-full accent-brand h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="shrink-0 w-24">
                          <Input
                            type="number"
                            name="sqft"
                            value={formData.sqft}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted">Adjust the slider to match your carpet area.</p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="block text-sm font-bold">Modular Kitchen</label>
                        <select
                          name="kitchen"
                          value={formData.kitchen}
                          onChange={handleChange}
                          className="w-full p-3 rounded-xl border border-line bg-white focus:ring-2 focus:ring-brand focus:outline-none"
                        >
                          <option value="yes">Include Kitchen</option>
                          <option value="no">No Kitchen</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-sm font-bold">Number of Wardrobes</label>
                        <Input
                          type="number"
                          name="wardrobes"
                          min="0"
                          max="10"
                          value={formData.wardrobes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4 max-w-md mx-auto">
                      <label className="block text-sm font-bold">Enter your number to see the estimate</label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="9999999999"
                        pattern="[0-9]{10}"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted">We will send a detailed breakdown to this number.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t border-line">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? "invisible" : ""}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={handleNext}>
                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" size="lg" className="px-8 shadow-xl shadow-brand/20">
                    Calculate Estimate <Calculator className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold font-fraunces text-brand-dark">Estimate Ready!</h3>
              <div className="py-6 px-8 bg-brand/5 rounded-2xl inline-block border border-brand/20">
                <p className="text-4xl font-bold text-brand">{result.split(": ")[1]}</p>
              </div>
              <p className="text-muted max-w-md mx-auto">
                This is an approximate estimate based on standard rates. For a precise quote, let's schedule a site visit.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={() => setResult(null)}>Recalculate</Button>
                <Button>Book Free Site Visit</Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
