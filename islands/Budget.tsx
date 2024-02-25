import { computed, useSignal } from "@preact/signals";
import { Handlers } from "$fresh/server.ts";
import { classNames, generateId } from "../utilities.ts";

/** TYPES **/
const frequencies = {
  monthly: "monthly",
  weekly: "weekly",
  "bi-weekly": "bi-weekly",
} as const;

type incomeType = typeof frequencies[keyof typeof frequencies];

type budget = {
  name: string;
  incomeType: incomeType;
  income: number;
};

type expense = {
  rowId: string;
  name: string;
  amount: number;
};

/** HTTP HANDLERS */

export default function Budget() {
  const exps: expense[] = [];

  /** GETTERS **/
  const generatedRowId = () => {
    return `row-${generateId()}`;
  };

  /** SIGNAlS **/
  const expenses = useSignal(exps);
  // const budget = useSignal<budget>({});

  /** COMPUTED **/
  const isExpensesRowsEmpty = computed(() => {
    return expenses.value.length === 0;
  });

  /** EVENT HANDLERS **/
  const handleAddExpenseRow = () => {
    expenses.value = [
      ...expenses.value,
      { rowId: generatedRowId(), name: "", amount: 0 },
    ];
  };

  const handleRemoveExpenseRow = (event: MouseEvent) => {
    const element = event.target as HTMLElement;

    const expenseRowId = element.dataset.target as string;

    expenses.value = expenses.value.filter((expense) => {
      return expense.rowId !== expenseRowId;
    });
  };

  const handleExpenseNameInput = (input: HTMLInputElement, rowId: string) => {
    expenses.value = expenses.value.map((expense) => {
      if (expense.rowId === rowId) {
        expense.name = input.value;
      }

      return expense;
    });
  };

  const handleExpenseAmountInput = (input: HTMLInputElement, rowId: string) => {
    expenses.value = expenses.value.map((expense) => {
      if (expense.rowId === rowId) {
        expense.amount = Number(input.value);
      }

      return expense;
    });
  };

  return (
    <div class="bg-white rounded-lg p-6 my-5 shadow-xl">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-xl font-semibold leading-7 text-gray-900">
          Budget
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600 colu">
          Create a budget
        </p>

        <div class="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="budgetName"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="budgetName"
                id="budgetName"
                autoComplete="address-level2"
                class="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              htmlFor="income-type"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Income Type
            </label>
            <div class="mt-2">
              <select
                id="income-type"
                name="income-type"
                autoComplete="income-type-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Bi-Weekly</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              htmlFor="postal-code"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Income
            </label>
            <div class="mt-2">
              <input
                type="number"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                class="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        {/* end top form */}
      </div>

      <h2 class="my-5 text-xl font-semibold leading-7 text-gray-900">
        Expenses
      </h2>

      <button
        type="button"
        class="button"
        onClick={() => (handleAddExpenseRow())}
      >
        Add Expenses
      </button>

      {expenses.value.map((expense) => {
        return (
          <>
            <div
              class={classNames(
                isExpensesRowsEmpty.value ? "hidden" : "",
                "mt-7 grid grid-rows-1 grid-cols-7 gap-x-4",
              )}
              id={expense.rowId}
            >
              <div class="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="expenseName[]"
                    id="expenseName"
                    autoComplete="address-level2"
                    class="block w-full rounded-md border-0 pl-3 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                    value={expense.name}
                    onInput={(
                      e,
                    ) => (handleExpenseNameInput(
                      e.target as HTMLInputElement,
                      expense.rowId,
                    ))}
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  htmlFor="expenseAmount"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    name="expenseAmount[]"
                    id="expenseAmount"
                    autoComplete="address-level2"
                    class="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                    value={expense.amount}
                    onInput={(
                      e,
                    ) => (handleExpenseAmountInput(
                      e.target as HTMLInputElement,
                      expense.rowId,
                    ))}
                  />
                </div>
              </div>

              <div class="grid justify-center self-end sm:col-span-1">
                <div class="">
                  <button
                    type="button"
                    id="expenseAction"
                    class="button justify-self-center self-center"
                    data-target={expense.rowId}
                    onClick={handleRemoveExpenseRow}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="flex justify-start mt-7">
        <button type="submit" className="button">
          Save Budget
        </button>
      </div>
    </div>
  );
}
