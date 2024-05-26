export function hyperlinkBold(hyperlink: string) {
  return hyperlink.replace('[', '[**').replace(']', '**]');
}
