import { computed, useSignal } from "@preact/signals";
import { Handlers } from "$fresh/server.ts";
import { classNames, generateId } from "../utilities.ts";

/** TYPES **/
const frequencies = {
  Monthly: "monthly",
  Weekly: "weekly",
  "Bi-Weekly": "bi-weekly",
} as const;

type incomeType = typeof frequencies[keyof typeof frequencies];

type budget = {
  name: string;
  incomeType: incomeType;
  income: number;
};

type expense = {
  name: string;
  amount: number;
};

/** HTTP HANDLERS */
export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();

    return ctx.render({});
  },
};

export default function Budget() {
  const exps: expense[] = [];

  /** SIGNAlS **/
  const expenses = useSignal(exps);
  const expensesNumRows = useSignal(0);

  const isExpensesRowsEmpty = computed(() => {
    return expensesNumRows.value === 0;
  });

  // const expensRowId = computed(() => {
  //   return
  // })

  /** EVENT HANDLERS **/
  const handleAddExpenseRow = () => {
    expensesNumRows.value++;
  };

  const handleRemoveExpenseRow = (event: MouseEvent) => {
    console.log(event);
    // const expenseRowId = event.target.dataset.target;

    // const row = document.getElementById(expenseRowId);
    // row?.remove();

    expensesNumRows.value--;
  };

  return (
    <div class="bg-white rounded-lg p-6 my-5 shadow-xl">
      <form>
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

        {Array(expensesNumRows.value).fill(0).map((_, i) => {
          return (
            <>
              <div
                class={classNames(
                  isExpensesRowsEmpty.value ? "hidden" : "",
                  "mt-7 grid grid-rows-1 grid-cols-7 gap-x-4",
                )}
                id={`expense-row-${generateId()}`}
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
                      name="expenseName"
                      id="expenseName"
                      autoComplete="address-level2"
                      class="block w-full rounded-md border-0 pl-3 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
                      name="expenseAmount"
                      id="expenseAmount"
                      autoComplete="address-level2"
                      class="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="grid justify-center items-center sm:col-span-1">
                  <div class="mt-8">
                    <button
                      type="button"
                      id="expenseAction"
                      class="button justify-self-center self-center"
                      data-target={`expense-row-${generateId()}`}
                      onClick={() => (handleRemoveExpenseRow())}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </form>
    </div>
  );
}
