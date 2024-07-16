import create from 'zustand';

interface StoreState {
    exchangeRate: number;
    eur: string;
    usd: string;
    errorEur: string;
    errorUsd: string;
    setEur: (eur: string) => void;
    setUsd: (usd: string) => void;
    clearErrors: () => void;
}

const useStore = create<StoreState>((set, get) => ({
    exchangeRate: 1.07, // Курс обмена EUR/USD
    eur: '',
    usd: '',
    errorEur: '', // Сообщение об ошибке для EUR инпута
    errorUsd: '', // Сообщение об ошибке для USD инпута
    setEur: (eur) => {
        if (eur === '') {
            set({ eur, usd: '', errorEur: '', errorUsd: '' });
            return;
        }

        // Проверка на отрицательное значение
        if (eur.startsWith('-')) {
            set({ eur, usd: '', errorEur: 'Введите положительное число', errorUsd: '' });
            return;
        }

        const eurValue = parseFloat(eur);
        if (/[^\d.]/.test(eur) || isNaN(eurValue)) {
            set({ eur, usd: '', errorEur: 'Введите корректное число', errorUsd: '' });
            return;
        }

        set({ eur, usd: (eurValue * get().exchangeRate).toFixed(2), errorEur: '', errorUsd: '' });
    },
    setUsd: (usd) => {
        if (usd === '') {
            set({ usd, eur: '', errorEur: '', errorUsd: '' });
            return;
        }

        // Проверка на отрицательное значение
        if (usd.startsWith('-')) {
            set({ usd, eur: '', errorEur: '', errorUsd: 'Введите положительное число' });
            return;
        }

        const usdValue = parseFloat(usd);

        if (/[-+*/]/.test(usd) || isNaN(usdValue)) {
            set({ usd, eur: '', errorEur: '', errorUsd: 'Введите корректное число' });
            return;
        }

        set({ usd, eur: (usdValue / get().exchangeRate).toFixed(2), errorEur: '', errorUsd: '' });
    },
    clearErrors: () => set({ errorEur: '', errorUsd: '' }),
}));

export default useStore;

