// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te("route." + title);
  console.log("dddd", title);
  console.log("hasKey", hasKey);
  const translatedTitle = "";

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t("route." + title);
    console.log("translatedTitle", translatedTitle);

    return translatedTitle;
  }
  return translatedTitle;
}
