type Register = { [key: string]: number };
type Instruction = string[];
type Labels = { [key: string]: number };

class Interpreter {
private registers: Register = {};
private program: Instruction[] = [];
private labels: Labels = {};
private pc: number = 0;

constructor(input: string) {
  const lines = input.split('\n').map(line => line.trim());
  this.parseLabels(lines);
  this.program = lines
    .filter(line => !line.endsWith(':') && line !== '')
    .map(line => line.split(/\s+/));
}

private parseLabels(lines: string[]): void {
  lines.forEach((line, index) => {
    if (line.endsWith(':')) {
      const label = line.slice(0, -1);
      this.labels[label] = index - Object.keys(this.labels).length;
    }
  });
}

private getValue(x: string): number {
  if (x in this.registers) return this.registers[x];
  if (x in this.labels) return this.labels[x];
  return parseInt(x);
}

public run(): void {
  while (this.pc < this.program.length) {
    const [opcode, ...args] = this.program[this.pc];

    switch (opcode) {
      case 'MOV':
        this.registers[args[0]] = this.getValue(args[1]);
        this.pc++;
        break;
      case 'ADD':
        this.registers[args[0]] += this.getValue(args[1]);
        this.pc++;
        break;
      case 'SUB':
        this.registers[args[0]] -= this.getValue(args[1]);
        this.pc++;
        break;
      case 'JMP':
        this.pc = this.getValue(args[0]);
        break;
      case 'JNZ':
        if (this.registers[args[0]] !== 0) {
          this.pc = this.getValue(args[1]);
        } else {
          this.pc++;
        }
        break;
      case 'HLT':
        return;
      default:
        throw new Error(`Unknown opcode: ${opcode}`);
    }
  }
}

public getRegisters(): Register {
  return { ...this.registers };
}
}

// Example usage
// const program = `
// start:
// MOV a 5
// MOV b 10
// loop:
// ADD a b
// SUB b 1
// JNZ b loop
// JMP end
// MOV a 100
// end:
// HLT
// `;

// const interpreter = new Interpreter(program);
// interpreter.run();
// console.log(interpreter.getRegisters());

export { Interpreter };