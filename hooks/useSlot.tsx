import { useAppDispatch, useAppSelector } from "../app/config/hook";
import useLoading from "./useLoading";
import { SlotService } from "../services/slotService";
import { setSlots } from "@/features/slots/slotSlice";

const useSlots = () => {
    const slotService = new SlotService("http://your-api-url.com");
    const { loading, withLoading } = useLoading();
    const slots = useAppSelector((state) => state.slot.data);
    const dispatch = useAppDispatch();

    const getSlots = (options: { limit: number, page: number }, searchOptions: { name?: string, author?: string, publisher?: string, publicationYear?: string, subject?: string }) => {
        const { limit, page } = options
        const { author, name, publicationYear, publisher, subject } = searchOptions as any
        withLoading(async () => {
            const response = await slotService.getSlots({ limit, page }, { name, author, publisher, publicationYear, subject });

            if (response.status == 200) {
                dispatch(setSlots(response.data));
            }
        });
    };

    return {
        slots,
        loading,
        getSlots,
    };
};

export default useSlots;