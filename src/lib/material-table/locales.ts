import { Localization } from "material-table";

export const tableLocales: Localization = {
  body: {
    emptyDataSourceMessage: '表示できるコンテンツがありません。',
    addTooltip: '追加',
    deleteTooltip: '削除',
    editRow: {
      cancelTooltip: 'キャンセル',
      saveTooltip: '保存',
      deleteText: 'この行を削除してもよろしいですか？'
    },
    filterRow: {
      filterTooltip: 'フィルター'
    },
    editTooltip: '編集'
  },
  grouping: {
    groupedBy: 'グループ:',
    placeholder: 'ヘッダーをドラッグ'
  },
  pagination: {
    firstAriaLabel: '最初のページ',
    firstTooltip: '最初のページ',
    labelDisplayedRows: '{from}-{to} | 現在のページ: {count}',
    labelRowsSelect: '行',
    labelRowsPerPage: '１ページあたりの行数:',
    lastAriaLabel: '最後のページ',
    lastTooltip: '最後のページ',
    nextAriaLabel: '次のページ',
    nextTooltip: '次のページ',
    previousAriaLabel: '前のページ',
    previousTooltip: '前のページ'
  },
  toolbar: {
    searchPlaceholder: '検索',
    searchTooltip: '検索',
    addRemoveColumns: '行を追加、または削除',
    exportAriaLabel: '書き出し',
    exportName: 'CSVとして書き出し',
    exportTitle: '書き出し',
    nRowsSelected: '{0}行選択',
    showColumnsAriaLabel: '列を表示',
    showColumnsTitle: '列を表示'
  },
  header: {
    actions: '操作'
  }
}