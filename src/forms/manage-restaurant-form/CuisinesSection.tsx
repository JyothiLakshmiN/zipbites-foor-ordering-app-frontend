import { FormField, FormItem } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";
const CuisinesSection = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <p className="text-sm text-muted-foreground">
                    Select the Cuisines that your restaurant serves
                </p>
            </div>
            <FormField control={ control } name="cuisines" render={({field}) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisinItem) => (
                            <CuisineCheckbox cuisine={cuisinItem} field={field}/>
                        ))}
                    </div>
                </FormItem>
            )}/>
        </div>
    );
}

export default CuisinesSection;
