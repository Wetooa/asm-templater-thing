import { NUMBER_OF_ENTRIES, NUMBER_OF_ESSENTIAL_DATA } from "./constants";
import  _ from "lodash"

export function generateCode(data: DataProps): string {

  const cleanedEssentialData = [];

  for (let i = 1; i <= NUMBER_OF_ESSENTIAL_DATA;++i) {
    const essentialData = ((data as any)[`essentialData${i}`] as string).split(' ');
    
    const codeED = essentialData.map((word) => _.capitalize(word)).join('');
    const currentEDCapitalize = essentialData.map((word) => _.capitalize(word)).join(' ');

    cleanedEssentialData.push({codeED, currentEDCapitalize});
  }

  let result = `
  section .data
    ; HEADER
    header: db "Cebu Institute of Technology - University", 10, "College of Computer Studies", 10, "College Library", 10, "First Semester Academic Year 2023-2024", 10, 10, "ENTER ${data.type.toUpperCase()}", 10
    headerLen: equ $-header
  `

  result += `
    ; INITIALIZE LABELS`

  for (let i = 1; i <= NUMBER_OF_ESSENTIAL_DATA; ++i) {
    const {codeED, currentEDCapitalize} = cleanedEssentialData[i - 1];

    result += `
    lbl${codeED}: db "${_.capitalize(data.label)} ${currentEDCapitalize}${i == 2 ? " No" : ""}: "
    lbl${codeED}Len: equ $-lbl${codeED}`
  }

  for (let i = 1; i <= NUMBER_OF_ENTRIES; ++i) {
    result += `

    ; INITIALIZE PRODUCT ${i}
    ${data.shortenedLabel}No${i}Lbl: db "----------", 10, "Product No. ${i}", 10
    ${data.shortenedLabel}No${i}LblLen: equ $-${data.shortenedLabel}No${i}Lbl`
  }

  const capitalizedName = data.fullname.split(' ').map((name) => _.capitalize(name)).join(' ');
  const date = new Date().toDateString();

  result += `

    ; FOOTER
    endingMessage: db " ", 10, "", 10, "${data.endingMessage}", 10, 10
    endingMessageLen: equ $-endingMessage
    lblProgrammerName: db "Programmer Name: "
    lblProgrammerNameLen: equ $-lblProgrammerName
    programmerName: db "${capitalizedName}", 10
    programmerNameLen: equ $-programmerName
    lblDate: db "Date: "  
    lblDateLen: equ $-lblDate
    date: db "${date}"
    dateLen: equ $-date
  `

  result += `

  section .bss`

  for (let i = 1; i <= NUMBER_OF_ENTRIES; ++i) {
    for (let j = 0; j < NUMBER_OF_ESSENTIAL_DATA; ++j) {
      const {codeED} = cleanedEssentialData[j];

      result += `
    ${data.shortenedLabel}No${i}${codeED}: resb 32`
    }
  }

  result += `


  section .text
    global _start  

  _start:
    mov eax, 4
    mov ebx, 1
    mov ecx, header
    mov edx, headerLen
    int 80h`

  for (let i = 1; i <= NUMBER_OF_ENTRIES; ++i) {
    

    result += `

    ; GET PRODUCT ${i}
    mov eax, 4
    mov ebx, 1
    mov ecx, ${data.shortenedLabel}No${i}Lbl
    mov edx, ${data.shortenedLabel}No${i}LblLen
    int 80h`

    for (let j = 0; j < NUMBER_OF_ESSENTIAL_DATA; ++j) {
      result += `
    mov eax, 4
    mov ebx, 1
    mov ecx, lbl${cleanedEssentialData[j].codeED}
    mov edx, lbl${cleanedEssentialData[j].codeED}Len
    int 80h
    mov eax, 3
    mov ebx, 0
    mov ecx, ${data.shortenedLabel}No${i}${cleanedEssentialData[j].codeED}
    mov edx, 32
    int 80h`
    }
    
  }

  result += '\n';

  for (let i = 1; i <= NUMBER_OF_ENTRIES; ++i) {
    result += `

    ; DISPLAY PRODUCT ${i}
    mov eax, 4
    mov ebx, 1
    mov ecx, ${data.shortenedLabel}No${i}Lbl
    mov edx, ${data.shortenedLabel}No${i}LblLen
    int 80h`

    for (let j = 0; j < NUMBER_OF_ESSENTIAL_DATA; ++j) {
      result += `
    mov eax, 4
    mov ebx, 1
    mov ecx, lbl${cleanedEssentialData[j].codeED}
    mov edx, lbl${cleanedEssentialData[j].codeED}Len
    int 80h
    mov eax, 4
    mov ebx, 1
    mov ecx, ${data.shortenedLabel}No${i}${cleanedEssentialData[j].codeED}
    mov edx, 32
    int 80h`
    }

  }

  result += `

    ; DISPLAY FOOTER
    mov eax, 4
    mov ebx, 1
    mov ecx, endingMessage
    mov edx, endingMessageLen
    int 80h
    mov eax, 4
    mov ebx, 1
    mov ecx, lblProgrammerName
    mov edx, lblProgrammerNameLen
    int 80h
    mov eax, 4
    mov ebx, 1
    mov ecx, programmerName
    mov edx, programmerNameLen
    int 80h
    mov eax, 4
    mov ebx, 1
    mov ecx, lblDate
    mov edx, lblDateLen
    int 80h
    mov eax, 4
    mov ebx, 1
    mov ecx, date
    mov edx, dateLen
    int 80h

    mov eax, 1
    mov ebx, 0
    int 80h
  `


  return result;
}