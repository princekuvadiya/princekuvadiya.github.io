import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["education", "personal-documents", "experience", "projects", "skills", "certifications", "interests", "contacts"],
            education: ["Government_Polytechnic_Gandhinagar", "Shree_Gadhapur_Vidhyalaya"],
            experience: ["Webito_Infotech", "Ambrox_Infotech"],
            projects: ["Lawyer_Application", "Service_Marketplace", "Ecommerce_D2C", "Instagram_Clone", "Chat_App"],
            skills: ["Flutter", "Node.js", "React.js", "Firebase", "Dart", "JavaScript", "Python", "Java"],
            certifications: ["UX_Designer", "Prompt_Engineering"],
            contacts: ["email", "phone", "github", "linkedin"],
            interests: ["Software Engineering", "Cyber Security", "Blockchain", "Deep Learning", "Computer Vision"],

        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">prince@portfolio</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );
    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;

            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;
            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }
                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory`;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "cat":
                if (words.length === 0) {
                    result = "Please specify a file to display";
                    break;
                }
                switch (words[0]) {
                    case "Government_Polytechnic_Gandhinagar":
                        result = "Diploma in Computer Engineering (2019-2022)";
                        break;
                    case "Shree_Gadhapur_Vidhyalaya":
                        result = "10th Standard (2018-2019)";
                        break;
                    case "Webito_Infotech":
                        result = "Flutter Developer Intern\n- Developed cross-platform mobile apps\n- Integrated Firebase Realtime Database\n- Implemented Google Sign-In";
                        break;
                    case "Ambrox_Infotech":
                        result = "Full-Stack Developer\n- Mastered Node.js, React.js, Flutter\n- Built portfolio website\n- Utilized best practices for scalability";
                        break;
                    case "Lawyer_Application":
                        result = "Patent Pending Application (Flutter, Node.js)\n- OCR-Powered document extraction\n- Multi-platform data integration\n- Secure authentication systems";
                        break;
                    case "Service_Marketplace":
                        result = "On-Demand Service App (Flutter, Node.js)\n- Marketplace with user/vendor apps\n- Real-time chat & negotiation\n- Stripe payment integration";
                        break;
                    case "Ecommerce_D2C":
                        result = "Ecommerce Platform (Flutter, Node.js, React)\n- Full-stack marketplace\n- PayPal integration\n- JWT authentication";
                        break;
                    case "Instagram_Clone":
                        result = "Instagram Clone (Flutter, Firebase)\n- Email verification\n- Post creation & interaction\n- Firebase integration";
                        break;
                    case "Chat_App":
                        result = "Chat Application (Flutter, Firebase)\n- Google authentication\n- Real-time messaging\n- Firebase storage";
                        break;
                    case "UX_Designer":
                        result = "Coursera Certification (August 2022)";
                        break;
                    case "Prompt_Engineering":
                        result = "Deep Learning Certification (September 2023)";
                        break;
                    case "email":
                        result = "princekuvadiya.162@gmail.com";
                        break;
                    case "phone":
                        result = "+917383199121";
                        break;
                    case "github":
                        result = "github.com/princekuvadiya";
                        break;
                    case "linkedin":
                        result = "linkedin.com/in/princekuvadiya";
                        break;
                    default:
                        result = `cat: ${words[0]}: No such file or directory`;
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/prince");
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome,about, about-prince,    trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome,about, about-prince,    trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome,about, about-prince,    trash, settings, sendmsg ]";
                }
                break;

            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about,about-prince,    trash, settings, sendmsg ]";
                }
                break;
            case "about":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-prince");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about,about-prince,    trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about,about-prince,    trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome,about, about-prince,    trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome,about, about-prince,    trash, settings, sendmsg ]";
                }
                break;
            // case "todoist":
            //     if (words[0] === "." || words.length === 0) {
            //         this.props.openApp("todoist");
            //     } else {
            //         result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek,    trash, settings, sendmsg ]";
            //     }
            //     break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "help":
                result = "Available Commands:<br>" +
                    "- cd: Change directory<br>" +
                    "- ls: List directory contents<br>" +
                    "- cat: Display file contents<br>" +
                    "- pwd: Print working directory<br>" +
                    "- echo: Display message<br>" +
                    "- clear: Clear terminal<br>" +
                    "- exit: Close terminal<br>" +
                    "- help: Show this help message<br>" +
                    "- about: Show Prince's information<br>" +
                    "- mkdir: Create a new directory<br>" +
                    "- code: Open VSCode<br>" +
                    "- spotify: Open Spotify<br>" +
                    "- chrome: Open Chrome<br>" +
                    "- trash: Open Trash<br>" +
                    "- about-prince: Open About Prince<br>" +
                    "- terminal: Open terminal<br>" +
                    "- settings: Open settings<br>" +
                    "- sendmsg: Open message editor";
                break;
            case "about-prince":
                result = "Prince Kuvadiya<br>" +
                    "Full-Stack & Flutter Developer<br>" +
                    "Location: Surat, Gujarat, India<br>" +
                    "Skills: Flutter, Node.js, React, Firebase<br>" +
                    "Experience: Webito Infotech, Ambrox Infotech<br>" +
                    "Education: Diploma in Computer Engineering";
                break;
            case "sudo":
                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });
                result = "<img class='w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found. Type 'help' for available commands.";
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {this.state.terminal}
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}